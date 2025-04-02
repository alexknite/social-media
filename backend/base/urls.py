from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from .views import (CustomTokenObtainPairView, CustomTokenRefreshView,
                    authenticated, create_post, get_posts,
                    get_user_profile_data, get_users_posts, register,
                    toggle_follow, toggle_like)

urlpatterns = [
    path("user_data/<str:pk>/", get_user_profile_data),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path("register/", register),
    path("authenticated/", authenticated),
    path("toggle_follow/", toggle_follow),
    path("posts/<str:pk>/", get_users_posts),
    path("toggle_like/", toggle_like),
    path("create_post/", create_post),
    path("get_posts/", get_posts),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
