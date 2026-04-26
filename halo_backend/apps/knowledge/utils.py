import pdfplumber
import tiktoken
from django.conf import settings
from openai import OpenAI

def get_openai_client():
    api_key = getattr(settings, 'OPENAI_API_KEY', None)
    if not api_key or api_key == 'dummy':
        return None
    return OpenAI(api_key=api_key)

def extract_text_from_pdf(pdf_file):
    text = ""
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text() or ""
            text += page_text + "\n"
            tables = page.extract_tables()
            for table in tables:
                for row in table:
                    text += " | ".join([str(cell) for cell in row if cell]) + "\n"
    return text

def chunk_text(text, max_tokens=500, overlap=50):
    encoding = tiktoken.get_encoding("cl100k_base")
    paragraphs = text.split('\n\n')
    chunks = []
    current_chunk = []
    current_length = 0
    for paragraph in paragraphs:
        tokens = encoding.encode(paragraph)
        if current_length + len(tokens) > max_tokens:
            chunks.append(encoding.decode(current_chunk))
            overlap_tokens = current_chunk[-overlap:] if len(current_chunk) > overlap else current_chunk
            current_chunk = overlap_tokens + tokens
            current_length = len(current_chunk)
        else:
            current_chunk.extend(tokens)
            current_length += len(tokens)
    if current_chunk:
        chunks.append(encoding.decode(current_chunk))
    return chunks

def embed_text(text):
    client = get_openai_client()
    if not client:
        return [0.0] * 1536
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    return response.data[0].embedding
