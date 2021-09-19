from django.urls import path
from rest_framework.schemas import get_schema_view
from music.views import (PluginPingView, SidebarView, MediaView,
PluginInfoView,CreateRoom, RoomInfo, UpdateRoom)

schema_view = get_schema_view(title="Rest API")

urlpatterns = [
      path("sidebar/", SidebarView.as_view(), name="sidebar"),
      path("test/", MediaView.as_view(), name="test"),
      path("info/", PluginInfoView.as_view(), name="info"),
      path("createroom/", CreateRoom.as_view(), name="createroom"),
      path("roominfo/", RoomInfo.as_view(), name="roominfo"),
      path("updateroom/", UpdateRoom.as_view(), name="updateroom"),
      path("ping/", PluginPingView.as_view(), name="ping"),
]
