from django.urls import path
from .views import LecturerListView, LecturerSearchView

urlpatterns = [
    path('list/', LecturerListView.as_view(), name='lecturer_list'),
    path('search/', LecturerSearchView.as_view(), name='lecturer_search'),
]
