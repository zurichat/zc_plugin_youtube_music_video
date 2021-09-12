from django.urls import path
from rest_framework.schemas import get_schema_view
from music.api import SidebarView, MediaView, PluginInfoView

schema_view = get_schema_view(title="Rest API")

urlpatterns = [
      path("sidebar/", SidebarView.as_view(), name="sidebar"),
      path("test/", MediaView.as_view(), name="test"),
      path("info/", PluginInfoView.as_view(), name="info"),

]
