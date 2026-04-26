from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.auth_bridge.urls')),
    path('api/admin/knowledge/', include('apps.knowledge.urls')),
    path('api/chat/', include('apps.chat.urls')),
    path('api/students/', include('apps.students.urls')),
    path('api/lecturers/', include('apps.lecturers.urls')),
    path('api/news/', include('apps.news.urls')),
    path('api/agents/', include('apps.agents.urls')),
]
