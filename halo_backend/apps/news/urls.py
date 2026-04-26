from django.urls import path
from .views import NewsListView, NewsCreateView

urlpatterns = [
    path('feed/', NewsListView.as_view(), name='news_feed'),
    path('create/', NewsCreateView.as_view(), name='news_create'),
]
