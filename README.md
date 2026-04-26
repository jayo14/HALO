# HALO — LASUSTECH AI Assistant

HALO is an AI-powered university assistant chatbot for Lagos State University of Science and Technology (LASUSTECH).

## Features
- **RAG Chatbot:** Context-aware responses using Claude 3.5 Sonnet and pgvector.
- **Streaming Responses:** Real-time message delivery via Server-Sent Events (SSE).
- **PDF Knowledge Ingestion:** Admin tool to ingest university handbooks with table support and OCR.
- **Student Verification:** Integration with student registry and Supabase Auth metadata.
- **Email Agent:** Generates and sends formal university emails on behalf of verified students.
- **Rate Limiting:** Protects resources for anonymous and authenticated users.

## Tech Stack
- **Frontend:** Next.js 14, TailwindCSS, shadcn/ui, Zustand, Supabase JS
- **Backend:** Django 5, DRF, Celery, Redis
- **Database:** Supabase (PostgreSQL + pgvector)
- **AI:** Anthropic Claude 3.5 Sonnet, OpenAI Embeddings

## Setup Instructions

### Backend (Django)
1. Navigate to `halo_backend`.
2. Install dependencies: `pip install -r ../requirements.txt`.
3. Configure `.env` (see example in requirements section).
4. Run migrations: `python manage.py migrate`.
5. Start server: `python manage.py runserver`.

### Frontend (Next.js)
1. Navigate to `halo_frontend`.
2. Install dependencies: `npm install`.
3. Configure `.env.local`.
4. Start dev server: `npm run dev`.

### Supabase
1. Run the SQL migration located in `supabase/migrations/20240426000000_initial_schema.sql`.
2. Enable pgvector extension.

## Environment Variables
- `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `SUPABASE_JWT_SECRET`, `SUPABASE_PROJECT_REF`
- `DATABASE_URL` (Direct connection string)
- `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `RESEND_API_KEY`
- `REDIS_URL`
