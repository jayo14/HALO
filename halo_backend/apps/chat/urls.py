from django.urls import path
from .views import ChatQueryView, ChatHistoryView

urlpatterns = [
    path('query/', ChatQueryView.as_view(), name='chat-query'),
    path('history/', ChatHistoryView.as_view(), name='chat-history'),
]
