from django.contrib.auth.models import User
from django.db.models import Avg, Count
from rest_framework import serializers
from .models import Movie, Rating

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data) 
        return user
    
class MovieSerializer(serializers.ModelSerializer):
    average_stars = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = '__all__'

    def get_average_stars(self, obj):
        return Rating.objects.filter(movie=obj).aggregate(Avg('star'))['star__avg']

    def get_comments_count(self, obj):
        return Rating.objects.filter(movie=obj).exclude(comment__isnull=True).exclude(comment__exact='').count()

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
    
# class NoteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Note
#         fields = ["id", "title", "content", "created_at", "author"]
#         extra_kwargs = {"author": {"read_only": True}}