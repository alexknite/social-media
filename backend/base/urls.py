from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from .views import (CustomTokenObtainPairView, CustomTokenRefreshView, authenticated,
                    get_user_profile_data, register)

urlpatterns = [
    path("user_data/<str:pk>/", get_user_profile_data),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path("register/", register),
    path('authenticated/', authenticated)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
