# api/serializers.py

from django.contrib.auth.models import User
from django.db.models import Avg, Count
from rest_framework import serializers
from .models import Work, Movie, Series, Documentary, Rating

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class WorkSerializer(serializers.ModelSerializer):
    average_stars = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Work
        fields = '__all__'

    def get_average_stars(self, obj):
        return Rating.objects.filter(work=obj).aggregate(Avg('star'))['star__avg']

    def get_comments_count(self, obj):
        return Rating.objects.filter(work=obj).exclude(comment__isnull=True).exclude(comment__exact='').count()

class MovieSerializer(WorkSerializer):
    class Meta(WorkSerializer.Meta):
        model = Movie
        fields = '__all__'

class SeriesSerializer(WorkSerializer):
    class Meta(WorkSerializer.Meta):
        model = Series
        fields = '__all__'

class DocumentarySerializer(WorkSerializer):
    class Meta(WorkSerializer.Meta):
        model = Documentary
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
