from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class LecturerListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        with connection.cursor() as cursor:
            cursor.execute("SELECT id, full_name, department, email, office_location FROM lecturers WHERE is_active=True")
            rows = cursor.fetchall()
            return Response([{"id": r[0], "full_name": r[1], "department": r[2], "email": r[3], "office": r[4]} for r in rows])

class LecturerSearchView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        query = request.query_params.get('q', '')
        with connection.cursor() as cursor:
            cursor.execute("SELECT id, full_name, department FROM lecturers WHERE full_name ILIKE %s OR department ILIKE %s", [f"%{query}%", f"%{query}%"])
            rows = cursor.fetchall()
            return Response([{"id": r[0], "full_name": r[1], "department": r[2]} for r in rows])
