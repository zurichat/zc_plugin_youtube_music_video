from django.urls import path
from music.views import *


urlpatterns = [   
    
    path("test", MediaView.as_view(), name="test"),

    path("info", PluginInfoView.as_view(), name="info"),

    path("ping", PluginPingView.as_view(), name="ping"),

    path("user-count", UserCountView.as_view(), name="header-user-count"),

    path("current-song", change_room_image.as_view(), name="current-song"),


    path("songs", SongView.as_view(), name="song"),
    path("deletesong", DeleteSongView.as_view(), name="deletesong"),
    path("org/<int:org_id>/members/<int:member_id>/search", SongSearchView.as_view(), name = "songsearch"),
    # path("deletesong", removesong, name="deletesong"), #delete songs 
   

    path("comments", CommentView.as_view(), name="comments"),
    path("deletecomment", DeleteCommentView.as_view(), name="deletecomment"),
    path("updatecomment", UpdateCommentView.as_view(), name="updatecomment"),
    # path("deletecomment", removecomment, name="deletecomment"), #remove comments


    path("createroom", CreateRoomView.as_view(), name="createroom"),
    path("room", RoomView.as_view(), name="room"),
    path("deleteroom", DeleteRoomView.as_view, name="deleteroom"), #delete room 
    path("joinroom", AddToRoomView.as_view(), name="joinroom"),
    #  path("room/<str:_id>/user", RoomView.as_view(), name="room"),
    

    path("user", MemberListView.as_view(), name="user"), #works for get and post
    path("deleteuser", DeleteUserView.as_view(), name="deleteuser"), #remove user
           

    # path("<int:orgid>/musicroom/<int:roomid>/users", AddToRoomView.as_view(), name="add_to_room"),
    # path("deleteuser", removemember, name="deleteuser"), #remove user
    
]
