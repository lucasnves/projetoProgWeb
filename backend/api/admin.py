# api/urls.py

from django.contrib import admin
from .models import Work, Movie, Series, Documentary, Rating, Genre

# Register your models here.
admin.site.register(Work)
admin.site.register(Movie)
admin.site.register(Series)
admin.site.register(Documentary)
admin.site.register(Rating)
admin.site.register(Genre)
