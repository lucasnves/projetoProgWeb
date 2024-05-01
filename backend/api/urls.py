from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.MovieViewSet.as_view(), name='movie-list'),
]