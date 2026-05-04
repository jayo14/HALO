from django.contrib import admin
from .models import ConversationLog

@admin.register(ConversationLog)
class ConversationLogAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'query_snippet', 'created_at')
    readonly_fields = ('user_id', 'query', 'response', 'created_at')
    
    def query_snippet(self, obj):
        return obj.query[:50] + "..." if len(obj.query) > 50 else obj.query
