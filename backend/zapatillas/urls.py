from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from . import views
from django.conf.urls.static import static
from .views_serializer import router
from .views import LoadMenu  # Importa `LoadMenu` desde `views.py`


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('productos.urls')),  # Incluye las URLs de `productos`
     path('load/', LoadMenu.as_view(), name='load_menu'),  # Ruta para LoadMenu
]

