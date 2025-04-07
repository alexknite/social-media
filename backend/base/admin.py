from django.contrib import admin

from .models import AdminLog, MyUser, Post, Report

admin.site.register(MyUser)
admin.site.register(Post)
admin.site.register(Report)
admin.site.register(AdminLog)
