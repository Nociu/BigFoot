from django.contrib import admin
from django.urls import path
from admins import views

urlpatterns = [


    path('crearzapatilla/', views.crearzapatilla, name="crearzapatilla"),
    path('listarzapatilla/', views.listarzapatilla, name="listarzapatilla"),
    path('eliminarzapatilla/<int:id>/', views.eliminarzapatilla, name="eliminarzapatilla"),
    path('editarzapatilla/<int:id>/', views.editarzapatilla, name='editarzapatilla'),
    path('zapatilladetalle/<int:id>/', views.zapatilladetalle, name='zapatilladetalle'),

    path('crearpersona/', views.crearpersona, name="crearpersona"),
    path('listarpersona/', views.listarpersona, name="listarpersona"),
    path('eliminarpersona/<int:id>/', views.eliminarpersona, name="eliminarpersona"),
    path('editarpersona/<int:id>/', views.editarpersona, name='editarpersona'),
    path('personadetalle/<int:id>/', views.personadetalle, name='personadetalle'),




]