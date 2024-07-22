from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    pass  # Puedes agregar campos adicionales aquí si los necesitas

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.username

class Zapatilla(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(max_length=100)
    precio = models.IntegerField()
    stock = models.IntegerField()

    def __str__(self):
        return f"{self.nombre} {self.descripcion}"

    class Meta:
        db_table = 'zapatilla'

class Persona(models.Model):
    nombre = models.CharField(max_length=30, blank=True, null=True)
    apellido = models.CharField(max_length=30, blank=True, null=True)
    correo = models.EmailField(unique=False)
    contraseña = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.nombre}, {self.apellido}, {self.correo}"
    
    class Meta:
        db_table = 'persona'

class Boleta(models.Model):
    id_boleta = models.IntegerField(primary_key=True)
    detalle_boleta = models.CharField(max_length=200)
    total_boleta = models.IntegerField()

    def __str__(self):
        return f"{self.detalle_boleta}"
    
    class Meta:
        db_table = 'zapa_boleta'
