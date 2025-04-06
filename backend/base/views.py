from logging import log

from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

from .models import MyUser, Post, Report
from .serializers import (MyUserProfileSerializer, PostSerializer,
                          ReportSerializer, UserRegisterSerializer,
                          UserSerializer)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def authenticated(request):
    return Response("authenticated!")


@api_view(["POST"])
@authentication_classes([])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens["access"]
            refresh_token = tokens["refresh"]
            username = request.data["username"]

            try:
                user = MyUser.objects.get(username=username)
            except MyUser.DoesNotExist:
                return Response({"error": "User does not exist"})

            res = Response()
            res.data = {
                "success": True,
                "user": {
                    "username": user.username,
                    "bio": user.bio,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": user.role,
                },
            }
            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )
            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )

            return res
        except:
            return Response({"success": False})


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):

        try:
            refresh_token = request.COOKIES.get("refresh_token")
            request.data["refresh"] = refresh_token

            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens["access"]

            res = Response()

            res.data = {"success": True}

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )

            return res
        except:
            return Response({"success": False})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile_data(request, pk):
    try:
        try:
            user = MyUser.objects.get(username=pk)
        except MyUser.DoesNotExist:
            return Response({"error": "User does not exist"})

        serializer = MyUserProfileSerializer(user, many=False)

        following = False

        if request.user in user.followers.all():
            following = True

        return Response(
            {
                **serializer.data,
                "is_our_profile": request.user.username == user.username,
                "following": following,
            }
        )
    except:
        return Response({"error": "Failed to fetch user data"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def toggle_follow(request):

    try:
        try:
            my_user = MyUser.objects.get(username=request.user.username)
            user_to_follow = MyUser.objects.get(username=request.data["username"])
        except MyUser.DoesNotExist:
            return Response({"error": "User does not exist"})

        if my_user in user_to_follow.followers.all():
            user_to_follow.followers.remove(my_user)
            return Response({"now_following": False})
        else:
            user_to_follow.followers.add(my_user)
            return Response({"now_following": True})
    except:
        return Response({"error": "Error attempting to follow user"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_users_posts(request, pk, arch):
    try:
        user = MyUser.objects.get(username=pk)
        my_user = MyUser.objects.get(username=request.user.username)
    except MyUser.DoesNotExist:
        return Response({"error": "User does not exist"})

    if arch == "archived":
        posts = user.posts.filter(archived=True).order_by("-created_at")
    elif arch == "unarchived":
        posts = user.posts.filter(archived=False).order_by("-created_at")
    else:
        posts = user.posts.all().order_by("-created_at")

    serializer = PostSerializer(posts, many=True)

    data = []

    for post in serializer.data:
        new_post = {}

        if my_user.username in post["likes"]:
            new_post = {**post, "liked": True}
        else:
            new_post = {**post, "liked": False}
        data.append(new_post)

    return Response(data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def toggle_like(request):
    try:
        try:
            post = Post.objects.get(id=request.data["id"])
        except Post.DoesNotExist:
            return Response({"error": "Post does not exist"})

        try:
            user = MyUser.objects.get(username=request.user.username)
        except MyUser.DoesNotExist:
            return Response({"error": "User does not exist"})

        if user in post.likes.all():
            post.likes.remove(user)
            return Response({"now_liked": False})
        else:
            post.likes.add(user)
            return Response({"now_liked": True})
    except:
        return Response({"error": "Failed to like post"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_post(request):
    try:
        data = request.data

        user = MyUser.objects.get(username=request.user.username)

        if user.muted:
            return Response(
                {
                    "success": False,
                    "error": "You are muted! Try again when you have been unmuted by an admin.",
                }
            )

        post = Post.objects.create(user=user, description=data["description"])

        serializer = PostSerializer(post, many=False)

        return Response(serializer.data)
    except MyUser.DoesNotExist:
        return Response({"error": "User does not exist"})
    except:
        return Response({"error": "Error creating post"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_posts(request):
    try:
        my_user = MyUser.objects.get(username=request.user.username)
    except MyUser.DoesNotExist:
        return Response({"error": "User does not exist"})

    posts = Post.objects.all().order_by("-created_at")

    paginator = PageNumberPagination()
    paginator.page_size = 10

    result_page = paginator.paginate_queryset(posts, request)

    serializer = PostSerializer(result_page, many=True)

    data = []

    for post in serializer.data:
        new_post = {}

        if my_user.username in post["likes"]:
            new_post = {**post, "liked": True}
        else:
            new_post = {**post, "liked": False}
        data.append(new_post)

    return paginator.get_paginated_response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_users(request):
    query = request.query_params.get("query", "")
    users = MyUser.objects.filter(username__icontains=query)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_user_details(request):
    data = request.data

    try:
        user = MyUser.objects.get(username=request.user.username)
    except MyUser.DoesNotExist:
        return Response({"error": "User does not exist"})

    serializer = UserSerializer(user, data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({**serializer.data, "success": True})

    return Response({**serializer.errors, "success": False})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        res = Response()
        res.data = {"success": True}
        res.delete_cookie("access_token", path="/", samesite="None")
        res.delete_cookie("refresh_token", path="/", samesite="None")
        return res

    except:
        return Response({"success": False})


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_post(request, id):
    try:
        post = Post.objects.get(id=id)

        if post.user.username != request.user.username:
            return Response(
                {"error": "You do not have permission to delete this post."}
            )

        post.delete()
        return Response({"success": True})
    except Post.DoesNotExist:
        return Response({"error": "Post does not exist"})
    except:
        return Response({"success": False})


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user(request, username):
    try:
        user = MyUser.objects.get(username=username)

        if (
            request.user.role != "ADMIN" and (user.username != request.user.username)
        ) or user.role == "ADMIN":
            return Response(
                {
                    "error": "You do not have permission to delete this user.",
                    "success": False,
                }
            )

        user.delete()
        return Response({"success": True})
    except MyUser.DoesNotExist:
        return Response({"error": "User does not exist"})
    except:
        return Response({"success": False})


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def toggle_archived(request, id):
    try:
        post = Post.objects.get(id=id)

        if post.user.username != request.user.username:
            return Response(
                {"error": "You do not have permission to archive this post"}, status=403
            )

        post.archived = not post.archived
        post.save()

        return Response({"success": True, "archived": post.archived})
    except Post.DoesNotExist:
        return Response({"error": "Post does not exist"}, status=404)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def toggle_mute(request, username):
    try:
        user = MyUser.objects.get(username=username)

        if (not request.user.role == MyUser.Role.ADMIN) or (
            user.role == MyUser.Role.ADMIN
        ):
            return Response({"error": "You do not have permission to mute this user"})

        user.muted = not user.muted
        user.save()
        return Response({"success": True})
    except MyUser.DoesNotExist:
        return Response({"error": "User not found"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def report_user(request, username):
    try:
        reported_user = MyUser.objects.get(username=username)
        reporter = request.user
        reason = request.data.get("reason", "").strip().upper()
        description = request.data.get("description", "").strip()

        if not description:
            return Response({"error": "You must provide a description in your report."})

        valid_reasons = [choice[0] for choice in Report.Reason.choices]
        if reason not in valid_reasons:
            return Response({"error": "You must provide a valid reason."})

        Report.objects.create(
            user=reported_user,
            reporter=reporter,
            reason=reason,
            description=description,
        )

        return Response(
            {
                "success": True,
                "message": f"Successfully filed a report against {reported_user.username}",
            }
        )
    except MyUser.DoesNotExist:
        return Response({"error": "User was not found."})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_reports(request, username):
    try:
        if not request.user.role == MyUser.Role.ADMIN:
            return Response(
                {"error": "You do not have permission to view user reports."}
            )

        reported_user = MyUser.objects.get(username=username)

        reports = Report.objects.filter(user=reported_user)
        serializer = ReportSerializer(reports, many=True)

        return Response(serializer.data)
    except MyUser.DoesNotExist:
        return Response({"error": "User not found."})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_reports(request):
    try:
        if request.user.role != MyUser.Role.ADMIN:
            return Response({"error": "You do not have access to view user reports."})

        reports = Report.objects.all().order_by("-created_at")

        paginator = PageNumberPagination()
        paginator.page_size = 10

        result_page = paginator.paginate_queryset(reports, request)

        serializer = ReportSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)
    except:
        return Response(
            {"error": "There was an error fetching user reports. Try again later."}
        )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def toggle_resolved(request, id):
    try:
        report = Report.objects.get(id=id)

        if request.user.role != MyUser.Role.ADMIN:
            return Response(
                {"error": "You do not have access to resolve user reports."}
            )

        report.resolved = not report.resolved
        report.save()

        return Response({"success": True, "resolved": report.resolved})
    except Report.DoesNotExist:
        return Response({"error": "Report does not exist"}, status=404)
