from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=255, null=True, blank=True)
    role = models.CharField(max_length=50, default='public')
    matric_number = models.CharField(max_length=50, unique=True, null=True, blank=True)
    department = models.CharField(max_length=255, null=True, blank=True)
    level = models.CharField(max_length=10, null=True, blank=True)
    school_email = models.EmailField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'profiles'
        managed = False # Managed by Supabase migrations
