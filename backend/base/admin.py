from django.contrib import admin

from .models import MyUser, Post, Report

admin.site.register(MyUser)
admin.site.register(Post)
admin.site.register(Report)
