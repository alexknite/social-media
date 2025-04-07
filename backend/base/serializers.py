from rest_framework import serializers

from .models import AdminLog, MyUser, Post, Report


class UserRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = MyUser
        fields = ["username", "email", "first_name", "last_name", "password", "role"]
        extra_kwargs = {"role": {"read_only": True}}

    def create(self, validated_data):
        user = MyUser(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password"])
        user.role = MyUser.Role.USER
        user.save()
        return user


class MyUserProfileSerializer(serializers.ModelSerializer):
    follower_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = MyUser
        fields = [
            "username",
            "bio",
            "profile_image",
            "follower_count",
            "following_count",
            "muted",
            "banned",
        ]

    def get_follower_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()


class PostSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    formatted_date = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "username",
            "description",
            "formatted_date",
            "likes",
            "like_count",
            "archived",
        ]

    def get_username(self, obj):
        return obj.user.username

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_formatted_date(self, obj):
        return obj.created_at.strftime("%d %b %y")


class ReportSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    reporter = serializers.SerializerMethodField()
    formatted_date = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = [
            "id",
            "username",
            "reporter",
            "reason",
            "description",
            "formatted_date",
            "resolved",
        ]

    def get_username(self, obj):
        return obj.user.username

    def get_reporter(self, obj):
        return obj.reporter.username

    def get_formatted_date(self, obj):
        return obj.created_at.strftime("%d %b %y, %H:%M:%S")


class AdminLogSerializer(serializers.ModelSerializer):
    admin_username = serializers.SerializerMethodField()
    target_username = serializers.SerializerMethodField()
    formatted_date = serializers.SerializerMethodField()
    target_post = serializers.SerializerMethodField()

    class Meta:
        model = AdminLog
        fields = [
            "id",
            "admin_username",
            "action",
            "target_username",
            "target_post",
            "formatted_date",
            "details",
        ]

    def get_admin_username(self, obj):
        return obj.admin.username if obj.admin else None

    def get_target_post(self, obj):
        return obj.post.id if obj.post else None

    def get_target_username(self, obj):
        return obj.user.username if obj.user else None

    def get_formatted_date(self, obj):
        return obj.created_at.strftime("%d %b %y, %H:%M:%S")


class UserSerializer(serializers.ModelSerializer):
    reports = ReportSerializer(many=True, read_only=True)

    class Meta:
        model = MyUser
        fields = [
            "username",
            "bio",
            "email",
            "profile_image",
            "first_name",
            "last_name",
            "role",
            "muted",
            "reports",
            "banned",
        ]
