from django.urls import path
from music.views import *
from music.functions import *
from music.room_views import *

urlpatterns = [

    path("test", MediaView.as_view(), name="test"),
    path("info", PluginInfoView.as_view(), name="info"),
    path("ping", PluginPingView.as_view(), name="ping"),

    path("songs", SongView.as_view(), name="song"),
    path("deletesong", removesong, name="deletesong"),  # delete songs

    path("comments", CommentView.as_view(), name="comments"),
    path("deletecomment", removecomment, name="deletecomment"),  # remove comments

    # path("createroom", CreateRoomView.as_view(), name="createroom"),
    # path("room", RoomView.as_view(), name="room"),

    # path("add_to_room", AddToRoomView.as_view(), name="add_to_room"),
    # path("deleteuser", removemember, name="deleteuser"), #remove user

    #  path("user", MemberListView.as_view(), name="user"), #works for get and post
    # path("addmember", AddMember.as_view(), name="addmembers"), # not working
    # path("user-count", UserCountView.as_view(), name="header-user-count"),
    path("current-song", change_room_image.as_view(), name="current-song"),
    path("music-room/", musicroom_create_list_view),
    path("music-room/<str:room_id>/", musicroom_details_delete_view),
    path("music-room/<str:room_id>/members/", musicroom_members_add_list_views),
    path("music-room/<str:room_id>/members/<str:member_id>", musicroom_remove_member_views),


]
