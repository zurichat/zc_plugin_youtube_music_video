from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view
from frontend.views import IndexView


schema_view = get_schema_view(title="Rest API")


urlpatterns = [
    # coming from frontend app using react every thing we connect in App.js in components will be
    # rendered here in IndexView using Same Django app Server
    path("", IndexView.as_view(), name="home"),
    # wrote the urls for the songs model issue #226
    path("admin/", admin.site.urls),
    path("docs/", include_docs_urls(title="Rest API")),
    path('api/v1/', include(('music.urls', 'music'), namespace='music_v1')),
    path("schema/", schema_view),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

