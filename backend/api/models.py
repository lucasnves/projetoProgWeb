# api/models.py

from django.db import models
from django.contrib.auth.models import User
from polymorphic.models import PolymorphicModel

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Work(PolymorphicModel):
    id = models.IntegerField(primary_key=True) 
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    author = models.CharField(max_length=100)
    work_created = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    genres = models.ManyToManyField(Genre)

    def __str__(self):
        return self.name

class Movie(Work):
    box_office = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    year_released = models.IntegerField()

class Series(Work):
    seasons = models.IntegerField()
    episodes = models.IntegerField()
    year_started = models.IntegerField()
    year_ended = models.IntegerField(null=True, blank=True)

class Documentary(Work):
    duration = models.IntegerField()
    country_of_origin = models.CharField(max_length=100)
    theme = models.CharField(max_length=255)

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_ratings")
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="work_ratings")
    comment = models.TextField(blank=True, null=True)
    star = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.work.name} - {self.star} Stars"
