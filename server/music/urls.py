from django.urls import path
<<<<<<< HEAD
from rest_framework.schemas import get_schema_view
from music.views import PluginPingView, SidebarView, MediaView, PluginInfoView, addSongs, getSongs, updateSongs
=======
>>>>>>> 07f99faa2697630a8a67fa35a38f3e7aded03467

from music.views import PluginPingView, SidebarView, MediaView, PluginInfoView, AddToRoomView, CreateRoomView, \
    UserCountView, Songs

urlpatterns = [
<<<<<<< HEAD
      path("sidebar/", SidebarView.as_view(), name="sidebar"),
      path("test/", MediaView.as_view(), name="test"),
      path("addsong/", addSongs.as_view(), name="addsong"),
      path("getsong/", getSongs.as_view(), name="getsong"),
      path("updatesong/", updateSongs.as_view(), name="updatesong"),
      path("info/", PluginInfoView.as_view(), name="info"),
      path("ping/", PluginPingView.as_view(), name="ping"),
=======
    path("song/", Songs.as_view(), name="song"),
    path("header-user-count/", UserCountView.as_view(), name="header-user-count"),
    path("sidebar/", SidebarView.as_view(), name="sidebar"),
    path("test/", MediaView.as_view(), name="test"),
    path("info/", PluginInfoView.as_view(), name="info"),
    path("ping/", PluginPingView.as_view(), name="ping"),
    path("add_to_room/", AddToRoomView.as_view(), name="add_to_room"),
    path("create_room/", CreateRoomView.as_view(), name="create_room"),
>>>>>>> 07f99faa2697630a8a67fa35a38f3e7aded03467
]
