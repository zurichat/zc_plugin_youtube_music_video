from django.urls import path
from music.views import *


urlpatterns = [
    path(
        "org/<str:org_id>/room/<str:_id>/songs/currentsong",
        change_room_image.as_view(),
        name="currentsong",
    ),
    path("info", PluginInfoView.as_view(), name="info"),
    path("ping", PluginPingView.as_view(), name="ping"),
    path("org/<str:org_id>/room/<str:_id>/songs", SongView.as_view(), name="song"),
    path(
        "org/<str:org_id>/room/<str:_id>/songs/deletesong",
        DeleteSongView.as_view(),
        name="deletesong",
    ),
    path(
        "search/<str:org_id>/<str:member_id>",
        SongSearchView.as_view(),
        name="songsearch",
    ),
    path(
        "org/<str:org_id>/room/<str:_id>/comments",
        CommentView.as_view(),
        name="comments",
    ),
    path(
        "org/<str:org_id>/room/<str:_id>/comments/deletecomment",
        DeleteCommentView.as_view(),
        name="deletecomment",
    ),
    path(
        "org/<str:org_id>/room/<str:_id>/comments/updatecomment",
        UpdateCommentView.as_view(),
        name="updatecomment",
    ),
    path(
        "org/<str:org_id>/room/<str:_id>", RoomDetailView.as_view(), name="roomdetail"
    ),
    path(
        "org/<str:org_id>/room/<str:_id>/deleteroom",
        DeleteRoomView.as_view(),
        name="deleteroom",
    ),  # delete room
    path(
        "org/<str:org_id>/room/<str:_id>/members/usercount",
        UserCountView.as_view(),
        name="usercount",
    ),
    # path("createroom", CreateRoomView.as_view(), name="createroom"),
    path("org/<str:org_id>/room", RoomView.as_view(), name="room"),
    path(
        "org/<str:org_id>/room/<str:_id>/members/removeuser",
        DeleteRoomUserView.as_view(),
        name="removeuser",
    ),  # works for get and post
    path(
        "org/<str:org_id>/room/<str:_id>/members", RoomUserView.as_view(), name="user"
    ),  # user list
    path(
        "org/<str:org_id>/room/<str:room_id>/members/adduser",
        AddUserToRoomView.as_view(),
        name="adduser",
    ),
    path(
        "users/<str:member_id>/createroom", CreateRoomView.as_view(), name="createroom"
    ),
]
