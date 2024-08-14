# api/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('works/', views.WorkViewSet.as_view(), name='work-list'),
    path('works/filter/', views.FilterWorksView.as_view(), name='work-filter'),
    path('works/<int:pk>/', views.WorkDetailView.as_view(), name='work-detail'),
    path('ratings/', views.RatingViewSet.as_view(), name='ratings-list'),
    path('ratings/<int:pk>/update/', views.RatingUpdateView.as_view(), name='rating-update'),
    path('ratings/<int:pk>/delete/', views.RatingDeleteView.as_view(), name='rating-delete'),
    path('users/', views.CreateUserView.as_view(), name='user-create'),
    path('current-user/', views.CurrentUserView.as_view(), name='current-user'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
]
