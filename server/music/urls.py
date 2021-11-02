from django.urls import path
from music.views import *

# current url with orgid and roomid:
# https://music.zuri.chat/music/api/v1/org/61695d8bb2cc8a9af4833d46/room/6169d8b54bfde011fe582e65/
# https://music.zuri.chat/music/api/v1/org/61695d8bb2cc8a9af4833d46/members/6169cafb2a3204f3be4a271f/create
# https://music.zuri.chat/music/api/v1/org/61695d8bb2cc8a9af4833d46/room/6169d8b54bfde011fe582e65/members/remove


urlpatterns = [
    path(
        "org/<str:org_id>/room/<str:_id>/songs/current",
        change_room_image.as_view(),
        name="currentsong",
    ),  # current song
    path("info", PluginInfoView.as_view(), name="info"),
    path("ping", PluginPingView.as_view(), name="ping"),
    path(
        "org/<str:org_id>/room/<str:_id>/songs", SongView.as_view(), name="song"
    ),  # song
    path(
        "org/<str:org_id>/room/<str:_id>/songs/delete",
        DeleteSongView.as_view(),
        name="deletesong",
    ),  # delete song
    path(
        "search/<str:org_id>/<str:member_id>",
        SongSearchView.as_view(),
        name="songsearch",
    ),  # search
    path(
        "search-suggestions/<str:org_id>/<str:member_id>",
        SongSearchSuggestions.as_view(),
        name="songsearch",
    ),
    path(
        "org/<str:org_id>/room/<str:_id>/comments",
        CommentView.as_view(),
        name="comments",
    ),  # comments
    path(
        "org/<str:org_id>/room/<str:_id>/comments/delete",
        DeleteCommentView.as_view(),
        name="deletecomment",
    ),  # delete comment
    path(
        "org/<str:org_id>/room/<str:_id>/comments/update",
        UpdateCommentView.as_view(),
        name="updatecomment",
    ),  # update comment
    path(
        "org/<str:org_id>/room/<str:_id>", RoomDetailView.as_view(), name="roomdetail"
    ),  # room detail
    path(
        "org/<str:org_id>/room/<str:_id>/delete",
        DeleteRoomView.as_view(),
        name="deleteroom",
    ),  # delete room
    path(
        "org/<str:org_id>/room/<str:_id>/members/count",
        UserCountView.as_view(),
        name="usercount",
    ),
    path("org/<str:org_id>/room", RoomView.as_view(), name="room"),  # view the room
    path(
        "org/<str:org_id>/room/<str:_id>/members/remove",
        DeleteRoomUserView.as_view(),
        name="removeuser",
    ),  # remove user (works for get and post)
    path(
        "org/<str:org_id>/room/<str:_id>/members", RoomUserList.as_view(), name="user"
    ),  # user list
    path(
        "org/<str:org_id>/room/<str:room_id>/members/add",
        AddUserToRoomView.as_view(),
        name="adduser",
    ),  # add user
    path(
        "org/<str:org_id>/members/<str:member_id>/create",
        CreateRoom.as_view(),
        name="create",
    ),  # create room
    path("install", InstallView.as_view(), name="install"),
    path("uninstall", UninstallView.as_view(), name="uninstall"),
    path("org/<str:org_id>/room/<str:_id>/songs/likecount", songLikeCountView.as_view(), name="like-count"),
]
