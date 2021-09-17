from django.urls import path
from rest_framework.schemas import get_schema_view
from music.views import PluginPingView, SidebarView, MediaView, PluginInfoView, AddMediaView

schema_view = get_schema_view(title="Rest API")

urlpatterns = [
      path("sidebar/", SidebarView.as_view(), name="sidebar"),
      path("test/", MediaView.as_view(), name="test"),
      path("song/", AddMediaView.as_view(), name="song"),
      path("info/", PluginInfoView.as_view(), name="info"),
      path("ping/", PluginPingView.as_view(), name="ping"),
]
