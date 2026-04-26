from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from django.db import connection
from .utils import extract_text_from_pdf, chunk_text, embed_text

class KnowledgeCreateView(APIView):
    def post(self, request):
        category = request.data.get('category')
        title = request.data.get('title')
        content = request.data.get('content')
        source_url = request.data.get('source_url', '')

        chunks = chunk_text(content)
        for i, chunk in enumerate(chunks):
            embedding = embed_text(chunk)
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO knowledge_chunks (category, title, content, embedding, source_url, chunk_index) VALUES (%s, %s, %s, %s, %s, %s)",
                    [category, title, chunk, embedding, source_url, i]
                )

        return Response({"message": f"Created {len(chunks)} chunks"})

class PDFIngestView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        pdf_file = request.FILES.get('file')
        category = request.data.get('category', 'handbook')
        title = request.data.get('title', pdf_file.name)

        text = extract_text_from_pdf(pdf_file)
        chunks = chunk_text(text)

        for i, chunk in enumerate(chunks):
            embedding = embed_text(chunk)
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO knowledge_chunks (category, title, content, embedding, source_url, chunk_index) VALUES (%s, %s, %s, %s, %s, %s)",
                    [category, title, chunk, embedding, '', i]
                )

        return Response({"message": f"Ingested PDF into {len(chunks)} chunks"})
