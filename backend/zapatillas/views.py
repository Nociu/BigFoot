from rest_framework.views import APIView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from productos.models import Persona  # Importa Persona desde productos.models

class LoadMenu(APIView):
    def get(self, request, format=None):
        return JsonResponse({'BACKEND': 'http://localhost:9020/zapatilla/backend/'
                            ,'API': 'http://localhost:9020/api/xx/'
                            ,'Administrador':'http://localhost:9020/admin'
                            ,'Load':'http://localhost:9020/productos/load/'})

