from django.urls import path
from music.view.chat import CommentView, DeleteCommentView, UpdateCommentView
from music.view.room import (AddUserToRoomView, CreateRoom, DeleteRoomUserView,
                             DeleteRoomView, RoomDetailView, RoomUserList,
                             RoomView, UpdateRoomView, UserCountView)
from music.view.songs import (DeleteSongView, SongSearchSuggestions,
                              SongSearchView, SongView, songLikeCountView)
from music.view.static import (InstallView, PluginInfoView, PluginPingView,
                               UninstallView, change_room_image)

# current url with orgid and roomid:
# https://music.zuri.chat/music/api/v1/org/619ba4671a5f54782939d384/room/61a4c1cd4f88198ec49dd636
# https://music.zuri.chat/music/api/v1/org/619ba4671a5f54782939d384/members/6169cafb2a3204f3be4a271f/create
# http://music.zuri.chat/api/v1/sidebar?org=619ba4671a5f54782939d384&user=619baa6a1a5f54782939d38e


urlpatterns = [
    # static urls
    path("info", PluginInfoView.as_view(), name="info"),
    path("ping", PluginPingView.as_view(), name="ping"),
    path("install", InstallView.as_view(), name="install"),
    path("uninstall", UninstallView.as_view(), name="uninstall"),
    
    
    # songs urls
    path(
        "org/<str:org_id>/room/<str:_id>/songs/current",
        change_room_image.as_view(),
        name="currentsong",
    ),  # current song
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
        name="songsuggestions",
    ),
    path(
        "org/<str:org_id>/room/<str:_id>/songs/like",
        songLikeCountView.as_view(),
        name="like",
    ),  # like song
    
    
    # comments urls
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
    
    
    # room urls
    path(
        "org/<str:org_id>/room", RoomView.as_view(), name="room"
    ),  # retrieve list of rooms
    path(
        "org/<str:org_id>/room/<str:_id>", RoomDetailView.as_view(), name="roomdetail"
    ),  # room detail
    path(
        "org/<str:org_id>/room/<str:_id>/delete",
        DeleteRoomView.as_view(),
        name="deleteroom",
    ),  # delete room
    path(
        "org/<str:org_id>/room/<str:_id>/update",
        UpdateRoomView.as_view(),
        name="deleteroom",
    ),  # update room
    path(
        "org/<str:org_id>/members/<str:member_id>/create",
        CreateRoom.as_view(),
        name="create",
    ),  # create room
    path(
        "org/<str:org_id>/room/<str:_id>/members/count",
        UserCountView.as_view(),
        name="usercount",
    ),  # user count
    path(
        "org/<str:org_id>/room/<str:_id>/members/remove",
        DeleteRoomUserView.as_view(),
        name="removeuser",
    ),  # remove user
    path(
        "org/<str:org_id>/room/<str:_id>/members", RoomUserList.as_view(), name="user"
    ),  # user list
    path(
        "org/<str:org_id>/room/<str:room_id>/members/add",
        AddUserToRoomView.as_view(),
        name="adduser",
    ),  # add user
]
