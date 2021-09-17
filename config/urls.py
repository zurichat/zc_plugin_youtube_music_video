from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from django.views.generic import TemplateView


urlpatterns = [
  # coming from frontend app using react every thing we connect in App.js in components will be
  # rendered here in IndexView using Same Django app Server
  # wrote the urls for the songs model issue #226
  path('admin/', admin.site.urls),
  path('', TemplateView.as_view(template_name='index.html')),
  path('api/v1/', include(('music.urls', 'music'), namespace='music_v1')),
  path('schema/', SpectacularAPIView.as_view(), name='schema'),
  path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
  path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
