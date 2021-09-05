from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view
from frontend.views import IndexView
from accounts.api import SidebarView
from accounts.views import PluginInfo
from accounts.views import SongsView


schema_view = get_schema_view(title="Rest API")


urlpatterns = [
    # coming from frontend app using react every thing we connect in App.js in components will be
    # rendered here in IndexView using Same Django app Server
    path("", IndexView.as_view(), name="home"),
    # wrote the urls for the songs model issue #226
    path("songs/", SongsView.as_view()),
    path("songs/<int:id>/", SongsView.as_view()),
    path("admin/", admin.site.urls),
    path("sidebar/", SidebarView.as_view(), name="sidebar"),
    path("api-auth/", include("rest_framework.urls")),
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    path("docs/", include_docs_urls(title="Rest API")),
    path("schema/", schema_view),
    path("info/", PluginInfo.as_view(), name="info"),
    path("", include('accounts.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

