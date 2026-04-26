import requests
from django.conf import settings
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class StudentVerifyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        matric_number = request.data.get('matric_number')
        full_name = request.data.get('full_name')
        department = request.data.get('department')

        # 1. Query registry
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT matric_number FROM students_registry WHERE matric_number=%s AND full_name ILIKE %s",
                [matric_number, f"%{full_name}%"]
            )
            row = cursor.fetchone()

        if not row:
            return Response({"verified": False, "message": "No matching student record found"}, status=400)

        # 2. Update Supabase User Metadata via Admin API
        user_id = request.user.username
        headers = {
            "Authorization": f"Bearer {settings.SUPABASE_SERVICE_KEY}",
            "apikey": settings.SUPABASE_SERVICE_KEY,
            "Content-Type": "application/json"
        }
        update_url = f"{settings.SUPABASE_URL}/auth/v1/admin/users/{user_id}"
        payload = {"user_metadata": {"role": "verified_student"}}

        resp = requests.put(update_url, json=payload, headers=headers)

        # 3. Update local profile
        with connection.cursor() as cursor:
            cursor.execute(
                "UPDATE profiles SET role='verified_student', matric_number=%s, department=%s WHERE id=%s",
                [matric_number, department, user_id]
            )

        return Response({"verified": True, "message": "Student verified successfully"})

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM profiles WHERE id=%s", [request.user.username])
            row = cursor.fetchone()
            # Construct dict (simplified)
            return Response({"profile": row})
