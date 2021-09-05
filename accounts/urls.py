from rest_framework import routers
from django.urls import path, include
from accounts.views import CommentViewSet

router = routers.DefaultRouter()
router.register(r'comments', CommentViewSet, basename='comments')

urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls")),
]
