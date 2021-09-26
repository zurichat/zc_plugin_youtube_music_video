from django.urls import path
from music.views import *

urlpatterns = [
    path("song/", SongView.as_view(), name="song"),
    path("header-user-count/", UserCountView.as_view(), name="header-user-count"),
    path("sidebar", SidebarView.as_view(), name="sidebar"),
    path("test/", MediaView.as_view(), name="test"),
    path("info/", PluginInfoView.as_view(), name="info"),
    path("ping/", PluginPingView.as_view(), name="ping"),
    path("add_to_room/", AddToRoomView.as_view(), name="add_to_room"),
    path("createroom/", CreateRoomView.as_view(), name="createroom"),
    path("comments/", CommentView.as_view(), name="comments"),
    path("exit/", leave_room, name="exit"),
    path("room/", RoomView.as_view(), name="room"),
    
]
