from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.MovieViewSet.as_view(), name='movie-list'),
    path('movies/filter/', views.FilterMoviesView.as_view(), name='movie-filter'),
    path('ratings/', views.RatingViewSet.as_view(), name='ratings-list'),
]