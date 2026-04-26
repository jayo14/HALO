from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from apps.knowledge.utils import embed_text

class NewsListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        category = request.query_params.get('category')
        sql = "SELECT id, title, body, category, published_at FROM news"
        params = []
        if category:
            sql += " WHERE category=%s"
            params.append(category)
        sql += " ORDER BY published_at DESC"

        with connection.cursor() as cursor:
            cursor.execute(sql, params)
            rows = cursor.fetchall()
            return Response([{"id": r[0], "title": r[1], "body": r[2], "category": r[3], "published_at": r[4]} for r in rows])

class NewsCreateView(APIView):
    # Admin only check would go here
    def post(self, request):
        title = request.data.get('title')
        body = request.data.get('body')
        category = request.data.get('category')

        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO news (title, body, category) VALUES (%s, %s, %s) RETURNING id",
                [title, body, category]
            )
            news_id = cursor.fetchone()[0]

            # Also embed into knowledge base
            embedding = embed_text(f"{title}\n{body}")
            cursor.execute(
                "INSERT INTO knowledge_chunks (category, title, content, embedding) VALUES (%s, %s, %s, %s)",
                ["event" if category == "event" else "news", title, body, embedding]
            )

        return Response({"id": news_id, "message": "News created and embedded"})
