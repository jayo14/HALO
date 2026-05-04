from django.contrib import admin
from .models import News

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'published_at')
    search_fields = ('title', 'body')
    list_filter = ('category', 'published_at')
