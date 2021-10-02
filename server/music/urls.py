from django.urls import path
from music.views import *
from music.functions import *



urlpatterns = [   
    
    path("test", MediaView.as_view(), name="test"),
    path("info", PluginInfoView.as_view(), name="info"),
    path("ping", PluginPingView.as_view(), name="ping"),


    path("songs", SongView.as_view(), name="song"),
    path("deletesong", removesong, name="deletesong"), #delete songs 
   

    path("comments", CommentView.as_view(), name="comments"),
    path("deletecomment", removecomment, name="deletecomment"), #remove comments


    path("createroom", CreateRoomView.as_view(), name="createroom"),
    path("room", RoomView.as_view(), name="room"),
           

    path("<int:orgid>/musicroom/<int:roomid>/users", AddToRoomView.as_view(), name="add_to_room"),
    path("deleteuser", removemember, name="deleteuser"), #remove user
    
    path("user", MemberListView.as_view(), name="user"), #works for get and post
    path("addmember", AddMember.as_view(), name="addmembers"), # not working
    path("user-count", UserCountView.as_view(), name="header-user-count"),
    path("current-song", change_room_image.as_view(), name="current-song"),
    
]
