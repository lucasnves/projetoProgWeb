# api/admin.py

from django.contrib import admin
from .models import Work, Movie, Series, Documentary, Rating, Genre

class GenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_filter = ('name',)

class WorkAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'author', 'work_created', 'created_at', 'updated_at')
    list_filter = ('author', 'work_created', 'created_at', 'updated_at')
    search_fields = ('name', 'description', 'author')

class MovieAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'author', 'work_created', 'created_at', 'updated_at', 'box_office', 'year_released')
    list_filter = ('author', 'year_released', 'box_office')
    search_fields = ('name', 'description', 'author')

class SeriesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'author', 'work_created', 'created_at', 'updated_at', 'seasons', 'episodes', 'year_started', 'year_ended')
    list_filter = ('author', 'year_started', 'year_ended')
    search_fields = ('name', 'description', 'author')

class DocumentaryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'author', 'work_created', 'created_at', 'updated_at', 'duration', 'country_of_origin', 'theme')
    list_filter = ('country_of_origin', 'theme')
    search_fields = ('name', 'description', 'author')

class RatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'work', 'star', 'created_at', 'updated_at')
    list_filter = ('user', 'work', 'star')
    search_fields = ('user__username', 'work__name', 'star')


admin.site.register(Genre, GenreAdmin)
admin.site.register(Work, WorkAdmin)
admin.site.register(Movie, MovieAdmin)
admin.site.register(Series, SeriesAdmin)
admin.site.register(Documentary, DocumentaryAdmin)
admin.site.register(Rating, RatingAdmin)