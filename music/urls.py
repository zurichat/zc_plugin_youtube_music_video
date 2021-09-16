from django.urls import path
from rest_framework.schemas import get_schema_view
from music.views import PluginPingView, SidebarView, MediaView, PluginInfoView, User_Auth, User_Info

schema_view = get_schema_view(title="Rest API")

urlpatterns = [
      path("sidebar/", SidebarView.as_view(), name="sidebar"),
      path("test/", MediaView.as_view(), name="test"),
      path("info/", PluginInfoView.as_view(), name="info"),
      path("ping/", PluginPingView.as_view(), name="ping"),
      path("authtoken/", User_Auth.as_view(), name="auth-test"),
      path("userprofile/", User_Info.as_view(), name="user-test"),
]
