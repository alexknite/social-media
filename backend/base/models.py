from django.contrib.auth.models import AbstractUser
from django.db import models


class MyUser(AbstractUser):
    class Role(models.TextChoices):
        USER = (
            "USER",
            "User",
        )
        ADMIN = "ADMIN", "Admin"

    username = models.CharField(max_length=50, unique=True, primary_key=True)
    bio = models.CharField(max_length=500)
    profile_image = models.ImageField(upload_to="profile_image", blank=True, null=True)
    followers = models.ManyToManyField(
        "self", symmetrical=False, related_name="following", blank=True
    )
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.USER)

    def __str__(self):
        return self.username


class Post(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="posts")
    description = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(MyUser, related_name="post_likes", blank=True)
    archived = models.BooleanField(default=False)
