from django.contrib import admin
from django.urls import path
from app import views

urlpatterns = [
    path('home/', views.index, name='index'),
    path('misproductos/', views.mis_productos, name='mis_productos'),
    path('quienessomos/', views.quienes_somos, name='quienes_somos'),
    path('contactenos/', views.contactenos, name='contactenos'),
    path('carrocompra/', views.carro_compra, name='carro_compra'),
    path('clima/', views.clima, name='clima'),
    path('menu', views.menu, name="menu"),
    path('login/', views.login, name="login"),
    path('register/', views.register, name="register"),
    path('forget/', views.forget, name="forget"),
    path('menuadmin/', views.menuadmin, name="menuadmin"),



]