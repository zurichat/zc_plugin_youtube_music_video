from django.urls import path
from music.views import *


urlpatterns = [

    path("current-song", change_room_image.as_view(), name="current-song"),
    path("info", PluginInfoView.as_view(), name="info"),
    path("ping", PluginPingView.as_view(), name="ping"),
    path("songs", SongView.as_view(), name="song"),
    path("deletesong", DeleteSongView.as_view(), name="deletesong"),
    path("org/<str:org_id>/members/<str:member_id>/search", SongSearchView.as_view(), name="songsearch"),
    path("comments", CommentView.as_view(), name="comments"),
    path("deletecomment", DeleteCommentView.as_view(), name="deletecomment"),
    path("updatecomment", UpdateCommentView.as_view(), name="updatecomment"),
    path("room/<str:_id>", RoomDetailView.as_view(), name="roomdetail"),
    path("deleteroom", DeleteRoomView.as_view(), name="deleteroom"),  # delete room
    path("user-count", UserCountView.as_view(), name="header-user-count"), 
    path("createroom", CreateRoomView.as_view(), name="createroom"),
    path("room", RoomView.as_view(), name="room"),
    path("room/<str:_id>/removeuser", DeleteRoomUserView.as_view(), name="removeuser"),  # works for get and post
    path("room/<str:_id>/user", RoomUserView.as_view(), name="user"),  # user list
    path("org/<str:org_id>/rooms/<str:room_id>/members/<str:member_id>", AddUserToRoomView.as_view(), name="add_user_to_room",
    ),

]
