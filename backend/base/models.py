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
    bio = models.CharField(max_length=500, blank=True)
    profile_image = models.ImageField(upload_to="profile_image", blank=True, null=True)
    followers = models.ManyToManyField(
        "self", symmetrical=False, related_name="following", blank=True
    )
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.USER)
    muted = models.BooleanField(default=False)
    banned = models.BooleanField(default=False)

    def __str__(self):
        return self.username


class Post(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="posts")
    description = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(MyUser, related_name="post_likes", blank=True)
    archived = models.BooleanField(default=False)


class Report(models.Model):
    class Reason(models.TextChoices):
        HARASSMENT = "HARASSMENT", "Harassment"
        FRAUD = "FRAUD", "Fraud"
        SPAM = "SPAM", "Spam"
        INAPPROPRIATE = "INAPPROPRIATE"
        OTHER = "OTHER", "Other"

    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="reports")
    reporter = models.ForeignKey(
        MyUser, on_delete=models.CASCADE, related_name="filed_reports"
    )
    reason = models.CharField(
        max_length=15, choices=Reason.choices, default=Reason.OTHER
    )
    description = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)


class AdminLog(models.Model):
    class Action(models.TextChoices):
        DELETE_USER = "DELETE_USER", "Deleted User"
        TOGGLE_MUTED = "TOGGLE_MUTED", "Toggled Muted"
        TOGGLE_BANNED = "TOGGLE_BANNED", "Toggled Banned"
        DELETE_POST = "DELETE_POST", "Deleted Post"
        TOGGLE_ARCHIVED = "TOGGLE_ARCHIVED", "Toggled Archived"
        OTHER = "OTHER", "Other"

    admin = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    action = models.CharField(
        max_length=20, choices=Action.choices, default=Action.OTHER
    )
    user = models.ForeignKey(
        MyUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="targeted_by_admin",
    )
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    details = models.TextField(max_length=500, blank=True)
