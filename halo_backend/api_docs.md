# HALO API Documentation

## Base URL
`http://localhost:8000`

## Authentication
Most endpoints require a Supabase JWT passed in the `Authorization` header:
`Authorization: Bearer <JWT_TOKEN>`

---

## 1. Chat
### POST `/api/chat/query/`
Queries the AI assistant with LASUSTECH knowledge.
- **Request Body:**
  ```json
  {
    "message": "Where is the Faculty of Engineering?",
    "history": [],
    "category": "navigation"
  }
  ```
- **Response:** Streaming `text/event-stream`.

---

## 2. News
### GET `/api/news/`
Fetches university news.
- **Query Params:** `category` (optional)
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Exam Dates",
      "body": "...",
      "category": "academic",
      "published_at": "..."
    }
  ]
  ```

### POST `/api/news/create/`
Creates a news item (Admin only).
- **Request Body:** `title`, `body`, `category`.

---

## 3. Students
### GET `/api/students/profile/`
Returns the authenticated user's profile.
- **Response:**
  ```json
  {
    "profile": {
      "full_name": "...",
      "role": "...",
      "matric_number": "...",
      "department": "..."
    }
  }
  ```

### POST `/api/students/verify/`
Verifies a student against the official registry.
- **Request Body:** `matric_number`, `full_name`, `department`.
