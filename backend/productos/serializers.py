from rest_framework import serializers
from .models import *


class ZapatillaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zapatilla
        fields = ['id','nombre', 'descripcion', 'precio', 'stock']


class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = ['id','nombre', 'apellido', 'correo', 'contraseña']


class BoletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boleta
        fields = ['id_boleta', 'detalle_boleta', 'total_boleta']

