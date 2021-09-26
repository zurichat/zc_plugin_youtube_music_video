from django.urls import path
from music.views import *


##note: still testing and making corrections. I'm aware that some are duplicated

urlpatterns = [   
    # path("sidebar/", SidebarView.as_view(), name="sidebar"),
    path("test", MediaView.as_view(), name="test"),
    path("info", PluginInfoView.as_view(), name="info"),
    path("ping", PluginPingView.as_view(), name="ping"),


    path("song", SongView.as_view(), name="song"),
    # path("deletesong/", remove_song, name="deletesong"), #Delete songs 


    path("comments", CommentView.as_view(), name="comments"),
    # path("deletechat/", remove_comments, name="deletechat"), #Delete comments


    path("createroom", CreateRoomView.as_view(), name="createroom"),
    path("room/<pk>", RoomView.as_view(), name="room"),
    # path("updateroom/<pk>", RoomUpdate.as_view(), name="updateroom"),
           

    path("add_to_room", AddToRoomView.as_view(), name="add_to_room"),
    # path("exit/", leave_room, name="exit"), #remove user from member list
       
    
    path("user", UserListView.as_view(), name="user"),
    path("addmember", AddMember.as_view(), name="addmembers"),
    path("header-user-count", UserCountView.as_view(), name="header-user-count"),
    path("userdelete/", DeleteMember.as_view(), name="userdelete"), #remove user from member list
    path("userremove/", RemoveMember.as_view(), name="userremove"), #remove user from member list
    
]
