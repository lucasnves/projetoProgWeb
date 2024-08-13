# api/views.py

from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer, WorkSerializer, MovieSerializer, SeriesSerializer, DocumentarySerializer, RatingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Work, Movie, Series, Documentary, Rating
from django.db.models import Avg, Count

WORK_TYPE_MODELS = {
    'movie': Movie,
    'series': Series,
    'documentary': Documentary,
}

class WorkViewSet(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WorkSerializer

    def get_serializer_class(self):
        work_type = self.request.data.get('work_type')
        if work_type == 'movie':
            return MovieSerializer
        elif work_type == 'series':
            return SeriesSerializer
        elif work_type == 'documentary':
            return DocumentarySerializer
        return WorkSerializer
    
    def get_queryset(self):
        queryset = Work.objects.all()
        name = self.request.query_params.get('name')
        year = self.request.query_params.get('year')
        work_type = self.request.query_params.get('type')
        id = self.request.query_params.get('id')

        if name:
            queryset = queryset.filter(name__icontains=name)
        if year:
            queryset = queryset.filter(work_created=year)
        if work_type:
            queryset = queryset.instance_of(self.get_model_from_type(work_type))
        if id:
            queryset = queryset.filter(id=id)

        return queryset

    def get_model_from_type(self, work_type):
        return WORK_TYPE_MODELS.get(work_type, Work)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class WorkDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer

class FilterWorksView(generics.ListAPIView):
    serializer_class = WorkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        filter_type = self.request.query_params.get('filter')
        work_type = self.request.query_params.get('type')
        queryset = Work.objects.all()

        if work_type:
            queryset = queryset.instance_of(self.get_model_from_type(work_type))

        if filter_type == 'recents':
            queryset = queryset.order_by('-created_at')
        elif filter_type == 'best_rated':
            queryset = queryset.annotate(avg_stars=Avg('work_ratings__star')).order_by('-avg_stars')
        elif filter_type == 'top_rated':
            queryset = queryset.annotate(rating_count=Count('work_ratings')).order_by('-rating_count')
        elif filter_type == 'least_rated':
            queryset = queryset.annotate(rating_count=Count('work_ratings')).order_by('rating_count')
        elif filter_type == 'most_commented':
            queryset = queryset.annotate(comment_count=Count('work_ratings__comment')).order_by('-comment_count')

        return queryset
    
    def get_model_from_type(self, work_type):
        return WORK_TYPE_MODELS.get(work_type, Work)

class RatingViewSet(generics.ListCreateAPIView):
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Rating.objects.all()
        work_id = self.request.query_params.get('work_id')
        user_id = self.request.query_params.get('user_id')

        if work_id:
            queryset = queryset.filter(work__id=work_id)
        if user_id:
            queryset = queryset.filter(user__id=user_id)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
