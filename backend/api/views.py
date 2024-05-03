from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, MovieSerializer, RatingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Movie, Rating

class MovieViewSet(generics.ListCreateAPIView):
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Movie.objects.all().order_by('-created_at')
        name = self.request.query_params.get('name', None)
        year = self.request.query_params.get('year', None)

        if name:
            queryset = queryset.filter(name__icontains=name)
        if year:
            year_int = int(year)
            queryset = queryset.filter(movie_created=year_int)
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save()

class RatingViewSet(generics.ListCreateAPIView):
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Rating.objects.all()
        movie_id = self.request.query_params.get('movie_id')
        user_id = self.request.query_params.get('user_id')

        if movie_id:
            queryset = queryset.filter(movie__id=movie_id)
        if user_id:
            queryset = queryset.filter(user__id=user_id)

        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Create your views here.
