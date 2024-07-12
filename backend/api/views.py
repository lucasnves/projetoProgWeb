from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, MovieSerializer, RatingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Movie, Rating
from django.db.models import Avg, Count

class MovieViewSet(generics.ListCreateAPIView):
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Movie.objects.all().order_by('-created_at')
        name = self.request.query_params.get('name', None)
        movie_id = self.request.query_params.get('id', None)
        year = self.request.query_params.get('year', None)

        if movie_id:
            queryset = queryset.filter(id__icontains=movie_id)
        if name:
            queryset = queryset.filter(name__icontains=name)
        if year:
            year_int = int(year)
            queryset = queryset.filter(movie_created=year_int)
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save()

class FilterMoviesView(generics.ListCreateAPIView):
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        filter_type = self.request.query_params.get('filter')
        queryset = Movie.objects.all()

        if filter_type == 'recents':
            queryset = queryset.order_by('-created_at')
        elif filter_type == 'best_rated':
            queryset = queryset.annotate(avg_stars=Avg('movie_ratings__star')).order_by('-avg_stars')
        elif filter_type == 'top_rated':
            queryset = queryset.annotate(rating_count=Count('movie_ratings')).order_by('-rating_count')
        elif filter_type == 'least_rated':
            queryset = queryset.annotate(rating_count=Count('movie_ratings')).order_by('rating_count')
        elif filter_type == 'most_commented':
            queryset = queryset.annotate(comment_count=Count('movie_ratings__comment')).order_by('-comment_count')
        elif filter_type == 'name':
            search_term = self.request.query_params.get('searchTerm')
            if search_term:
                queryset = queryset.filter(name__icontains=search_term)
        
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
