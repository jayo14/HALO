import json
from datetime import timedelta
from django.utils import timezone
from django.http import StreamingHttpResponse
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .utils import similarity_search, build_context, call_claude_stream, log_conversation
from apps.knowledge.utils import embed_text

class ChatQueryView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        message = request.data.get("message")
        history = request.data.get("history", [])
        category_filter = request.data.get("category")

        identifier = request.user.username if request.user.is_authenticated else self.get_client_ip(request)
        if not self.check_rate_limit(identifier, request.user):
            return Response({"error": "Rate limit exceeded"}, status=429)

        embedding = embed_text(message)
        chunks = similarity_search(embedding, top_k=5, category=category_filter)
        context = build_context(chunks)

        system_prompt = f"""
        You are Halo, the official AI assistant for LASUSTECH
        (Lagos State University of Science and Technology, Ikorodu, Lagos).

        You help students, prospective students, staff, and visitors with
        any question about LASUSTECH.

        RULES:
        - Only answer based on the provided context.
        - If the context doesn't contain the answer, say:
          "I don't have that information yet. Please check the LASUSTECH
          official website or visit the relevant office."
        - Be warm, helpful, and professional.
        - For directions, use landmark-based descriptions.
        - Never share phone numbers unless explicitly in the context.
        - Never fabricate lecturer names, course codes, or rules.

        CONTEXT:
        {context}
        """

        def stream_response():
            full_response = ""
            for chunk in call_claude_stream(system_prompt, history, message):
                yield chunk
                if "[DONE]" not in chunk:
                    try:
                        data = json.loads(chunk.replace("data: ", ""))
                        full_response += data.get("text", "")
                    except: pass

            if request.user.is_authenticated:
                log_conversation(request.user.username, message, full_response)

        return StreamingHttpResponse(stream_response(), content_type='text/event-stream')

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def check_rate_limit(self, identifier, user):
        limit = 20
        if user.is_authenticated:
            # Simplified role check; in reality check profile.role
            limit = 50

        now = timezone.now()
        reset_at = (now + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)

        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO rate_limits (identifier, request_count, reset_at) "
                "VALUES (%s, 1, %s) "
                "ON CONFLICT (identifier, reset_at) DO UPDATE "
                "SET request_count = rate_limits.request_count + 1, last_request = %s "
                "RETURNING request_count",
                [identifier, reset_at, now]
            )
            count = cursor.fetchone()[0]
            return count <= limit
class ChatHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT id, query, response, created_at FROM conversation_logs WHERE user_id=%s ORDER BY created_at DESC",
                [request.user.username]
            )
            rows = cursor.fetchall()
            return Response([
                {
                    "id": r[0],
                    "title": r[1][:50] + "..." if len(r[1]) > 50 else r[1],
                    "snippet": r[2][:100] + "..." if len(r[2]) > 100 else r[2],
                    "date": r[3]
                } for r in rows
            ])
