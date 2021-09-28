from django.urls import path
from music.views import *


##note: still testing and making corrections. I'm aware that some are duplicated

urlpatterns = [   
    
    path("test", MediaView.as_view(), name="test"),
    path("info", PluginInfoView.as_view(), name="info"),
    path("ping", PluginPingView.as_view(), name="ping"),


    path("song", SongView.as_view(), name="song"),
   

    path("comments", CommentView.as_view(), name="comments"),
    

    path("createroom", CreateRoomView.as_view(), name="createroom"),
    path("room", RoomView.as_view(), name="room"),
           

    path("add_to_room", AddToRoomView.as_view(), name="add_to_room"),
   
    
    path("user", UserListView.as_view(), name="user"),
    path("addmember", AddMember.as_view(), name="addmembers"),
    path("user-count", UserCountView.as_view(), name="header-user-count"),
    
    path("userdelete", DeleteMember.as_view(), name="userdelete"), #remove user from member list
    path("userremove", RemoveMember.as_view(), name="userremove"), #remove user from member list
    
]
