from django.urls import path
from .views import StudentVerifyView, ProfileView

urlpatterns = [
    path('verify/', StudentVerifyView.as_view(), name='student_verify'),
    path('profile/', ProfileView.as_view(), name='student_profile'),
]
