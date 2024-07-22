from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
    path('', include('admins.urls')),
     path('', TemplateView.as_view(template_name='register.html'), name='register'),  # Ruta para el formulario de registro

    
]
