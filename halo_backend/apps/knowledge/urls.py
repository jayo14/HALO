from django.urls import path
from .views import KnowledgeCreateView, PDFIngestView

urlpatterns = [
    path('create/', KnowledgeCreateView.as_view(), name='knowledge_create'),
    path('ingest-pdf/', PDFIngestView.as_view(), name='knowledge_pdf_ingest'),
]
