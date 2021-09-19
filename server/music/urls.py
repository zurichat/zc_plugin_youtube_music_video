from django.urls import path
from rest_framework.schemas import get_schema_view
from music.views import PluginPingView, SidebarView, MediaView, PluginInfoView, addSongs, getSongs, updateSongs


urlpatterns = [
      path("sidebar/", SidebarView.as_view(), name="sidebar"),
      path("test/", MediaView.as_view(), name="test"),
      path("addsong/", addSongs.as_view(), name="addsong"),
      path("getsong/", getSongs.as_view(), name="getsong"),
      path("updatesong/", updateSongs.as_view(), name="updatesong"),
      path("info/", PluginInfoView.as_view(), name="info"),
      path("ping/", PluginPingView.as_view(), name="ping"),
]
