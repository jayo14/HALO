from django.db import models

class ConversationLog(models.Model):
    user_id = models.CharField(max_length=255)
    query = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'conversation_logs'
        managed = False

    def __str__(self):
        return f"{self.user_id} - {self.created_at}"
