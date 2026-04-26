from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .utils import generate_email_draft, send_via_resend

class EmailDraftView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Ensure verified student
        if getattr(request, 'role', 'public') != 'verified_student':
            return Response({"error": "Only verified students can use the email agent"}, status=403)

        intent = request.data.get('intent')
        recipient_role = request.data.get('recipient_role')

        # 1. Fetch student info
        with connection.cursor() as cursor:
            cursor.execute("SELECT full_name, department, level, matric_number FROM profiles WHERE id=%s", [request.user.username])
            student = cursor.fetchone()
            student_info = {"full_name": student[0], "department": student[1], "level": student[2], "matric_number": student[3]}

            # 2. Fetch recipient info (e.g., HOD of their department)
            cursor.execute("SELECT full_name, email FROM lecturers WHERE department=%s AND bio ILIKE '%%HOD%%' LIMIT 1", [student_info['department']])
            recipient = cursor.fetchone()
            recipient_info = {"name": recipient[0] if recipient else "University Official", "email": recipient[1] if recipient else "info@lasustech.edu.ng", "role": recipient_role}

        draft = generate_email_draft(student_info, intent, recipient_info)
        draft['recipient_email'] = recipient_info['email']

        return Response(draft)

class EmailSendView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if getattr(request, 'role', 'public') != 'verified_student':
            return Response({"error": "Only verified students can use the email agent"}, status=403)

        subject = request.data.get('subject')
        body = request.data.get('body')
        recipient_email = request.data.get('recipient_email')

        res = send_via_resend(recipient_email, subject, body)

        # Log email
        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO email_logs (student_id, recipient, subject, body, sent_at, status) VALUES (%s, %s, %s, %s, NOW(), %s)",
                [request.user.username, recipient_email, subject, body, 'sent' if 'id' in res else 'failed']
            )

        return Response({"sent": True, "resend_id": res.get('id')})
