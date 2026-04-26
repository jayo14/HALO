import json
import requests
from django.conf import settings
from anthropic import Anthropic

def get_anthropic_client():
    api_key = getattr(settings, 'ANTHROPIC_API_KEY', None)
    if not api_key or api_key == 'dummy':
        return None
    try:
        return Anthropic(api_key=api_key)
    except:
        return None

def generate_email_draft(student_info, intent, recipient_info):
    prompt = f"""
    Generate a formal university email from a student to a university official.

    Student Name: {student_info.get('full_name')}
    Department: {student_info.get('department')}
    Level: {student_info.get('level')}
    Matric Number: {student_info.get('matric_number')}

    Recipient Role: {recipient_info.get('role')}
    Recipient Name/Email: {recipient_info.get('name')} ({recipient_info.get('email')})

    Student's Intent: {intent}

    Return ONLY a JSON object with 'subject' and 'body' keys.
    """

    client = get_anthropic_client()
    if not client:
        return {
            "subject": f"Inquiry regarding {intent[:20]}...",
            "body": f"Dear {recipient_info.get('role')},\n\nMy name is {student_info.get('full_name')} and I am writing to you regarding {intent}.\n\nBest regards,\n{student_info.get('full_name')}"
        }

    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1000,
        messages=[{"role": "user", "content": prompt}]
    )

    try:
        content = response.content[0].text
        return json.loads(content)
    except:
        return {"subject": "Manual Draft Required", "body": response.content[0].text}

def send_via_resend(to_email, subject, body):
    api_key = getattr(settings, 'RESEND_API_KEY', None)
    if not api_key or api_key == 'dummy':
        print(f"MOCK EMAIL SENT TO {to_email}: {subject}")
        return {"id": "mock-id-123"}

    url = "https://api.resend.com/emails"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "from": "Halo Assistant <halo@updates.lasustech.edu.ng>",
        "to": [to_email],
        "subject": subject,
        "text": body
    }

    resp = requests.post(url, json=payload, headers=headers)
    return resp.json()
