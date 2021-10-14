from django.urls import path
from music.views import *

# current url with orgid and roomid:
# https://music.zuri.chat/music/api/v1/org/614679ee1a5607b13c00bcb7/room/616714d49f7a790c08d222ee/

urlpatterns = [
    path(
        "org/<str:org_id>/room/<str:_id>/songs/current",
        change_room_image.as_view(),
        name="currentsong",
    ),
    path("info", PluginInfoView.as_view(), name="info"),
    path("ping", PluginPingView.as_view(), name="ping"),
    path("org/<str:org_id>/room/<str:_id>/songs", SongView.as_view(), name="song"),
    path(
        "org/<str:org_id>/room/<str:_id>/songs/delete",
        DeleteSongView.as_view(),
        name="deletesong",
    ),
    path(
        "search/<str:org_id>/<str:member_id>",
        SongSearchView.as_view(),
        name="songsearch",
    ),
    path(
        "search-suggestions/<str:org_id>/<str:member_id>",
        SongSearchSuggestions.as_view(),
        name="songsearch",
    ),
    path(
        "org/<str:org_id>/room/<str:_id>/comments",
        CommentView.as_view(),
        name="comments",
    ),
    path(
        "org/<str:org_id>/room/<str:_id>/comments/delete",
        DeleteCommentView.as_view(),
        name="deletecomment",
    ),
    path(
        "org/<str:org_id>/room/<str:_id>/comments/update",
        UpdateCommentView.as_view(),
        name="updatecomment",
    ),
    path(
        "org/<str:org_id>/room/<str:_id>", RoomDetailView.as_view(), name="roomdetail"
    ),
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
    # path("createroom", CreateRoomView.as_view(), name="createroom"),
    path("org/<str:org_id>/room", RoomView.as_view(), name="room"),
    path(
        "org/<str:org_id>/room/<str:_id>/members/remove",
        DeleteRoomUserView.as_view(),
        name="removeuser",
    ),  # works for get and post
    path(
        "org/<str:org_id>/room/<str:_id>/members", RoomUserView.as_view(), name="user"
    ),  # user list
    path(
        "org/<str:org_id>/room/<str:room_id>/members/add",
        AddUserToRoomView.as_view(),
        name="adduser",
    ),
    path(
        "users/<str:member_id>/createroom", CreateRoomView.as_view(), name="createroom"
    ),
    # path(
    #     "createroom", CreateRoomView.as_view(), name="createroom"
    # ),
]
