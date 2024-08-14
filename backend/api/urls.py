# api/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('works/', views.WorkViewSet.as_view(), name='work-list'),
    path('works/filter/', views.FilterWorksView.as_view(), name='work-filter'),
    path('works/<int:pk>/', views.WorkDetailView.as_view(), name='work-detail'),
    path('ratings/', views.RatingViewSet.as_view(), name='ratings-list'),
    path('users/', views.CreateUserView.as_view(), name='user-create'),
    path('current-user/', views.CurrentUserView.as_view(), name='current-user'),
]
