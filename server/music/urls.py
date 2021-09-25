from django.urls import path
from music.views import *

urlpatterns = [
    path("song/", SongView.as_view(), name="song"),
    path("deletesong/", remove_song, name="deletesong"), #Delete songs
    path("header-user-count/", UserCountView.as_view(), name="header-user-count"),
    path("sidebar", SidebarView.as_view(), name="sidebar"),
    path("test/", MediaView.as_view(), name="test"),
    path("info/", PluginInfoView.as_view(), name="info"),
    path("ping/", PluginPingView.as_view(), name="ping"),
    path("add_to_room", AddToRoomView.as_view(), name="add_to_room"),
    path("createroom/", RoomView.as_view(), name="createroom"),
    path("updateroom/", RoomDetail.as_view(), name="updateroom"),
    path("members/", MemberView.as_view(), name="members"),
    path("comments/", CommentView.as_view(), name="comments"),
    path("deletechat/", remove_comments, name="deletechat"), #Delete comments
    path("exit/", leave_room, name="exit"), #remove user from member list
    path("user/", UserView.as_view(), name="user"),
    # path("room", RoomView.as_view(), name="room"),
    
    
]
