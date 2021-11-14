from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

# from music.views import SidebarView

urlpatterns = [
    # coming from frontend app using react every thing we connect in App.js in components will be
    # rendered here in IndexView using Same Django app Server
    path("music/admin", admin.site.urls),
    path("music", TemplateView.as_view(template_name="index.html")),
    path("music/api/v1/", include(("music.urls", "music"), namespace="music_v1")),
    # path("sidebar", SidebarView.as_view(), name="sidebar"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
