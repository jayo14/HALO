from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'role', 'matric_number', 'department')
    search_fields = ('full_name', 'matric_number', 'department')
    list_filter = ('role', 'level')
