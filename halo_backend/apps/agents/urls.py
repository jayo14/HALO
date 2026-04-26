from django.urls import path
from .views import EmailDraftView, EmailSendView

urlpatterns = [
    path('email/draft/', EmailDraftView.as_view(), name='email_draft'),
    path('email/send/', EmailSendView.as_view(), name='email_send'),
]
