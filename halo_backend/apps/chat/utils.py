import json
from django.conf import settings
from django.db import connection
from anthropic import Anthropic
from apps.knowledge.utils import embed_text

def get_anthropic_client():
    api_key = getattr(settings, 'ANTHROPIC_API_KEY', None)
    if not api_key or api_key == 'dummy':
        return None
    try:
        return Anthropic(api_key=api_key)
    except:
        return None

def similarity_search(embedding, top_k=5, category=None):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT content, title, category FROM match_knowledge(%s, %s, %s)",
            [embedding, top_k, category]
        )
        rows = cursor.fetchall()
        return [{"content": r[0], "title": r[1], "category": r[2]} for r in rows]

def build_context(chunks):
    context = ""
    for i, chunk in enumerate(chunks):
        context += f"[{i+1}] Source: {chunk['title']} ({chunk['category']})\n{chunk['content']}\n\n"
    return context

def call_claude_stream(system_prompt, history, message):
    client = get_anthropic_client()
    if not client:
        yield "data: " + json.dumps({"text": "Hello! I am Halo. (Dummy Mode enabled - please provide ANTHROPIC_API_KEY for real responses)"}) + "\n\n"
        yield "data: [DONE]\n\n"
        return

    messages = []
    for m in history:
        messages.append({"role": m['role'], "content": m['content']})
    messages.append({"role": "user", "content": message})

    with client.messages.stream(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        system=system_prompt,
        messages=messages,
    ) as stream:
        for text in stream.text_stream:
            yield "data: " + json.dumps({"text": text}) + "\n\n"
        yield "data: [DONE]\n\n"

def log_conversation(user_id, message, response):
    with connection.cursor() as cursor:
        cursor.execute(
            "INSERT INTO conversations (user_id, messages) VALUES (%s, %s)",
            [user_id, json.dumps([{"role": "user", "content": message}, {"role": "assistant", "content": response}])]
        )
