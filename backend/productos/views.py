from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import json
from .models import *
from .serializers import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import CustomUserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .models import Persona
from .serializers import PersonaSerializer
from .forms import LoginForm
from django.contrib.auth.decorators import login_required

# Personas views here.
# Modificar la redireccion a la correspondiente en el frontend
# productos/views.py

def JSONResponseOkRows(data, msg):
    return JsonResponse({'rows': data, 'message': msg, 'status': 'ok'}, safe=False)

def JSONResponseOk(data, status=200, msg=""):
    return JsonResponse({'data': data, 'message': msg, 'status': 'ok'}, status=status)

def JSONResponseErr(errors, status=400):
    return JsonResponse({'errors': errors, 'status': 'error'}, status=status)

User = get_user_model()


class LoadMenu(APIView):
    def get(self, request, format=None):
        return JsonResponse({'BACKEND': 'http://localhost:9020/zapatilla/backend/',
                             'API': 'http://localhost:9020/api/xx/',
                             'Administrador': 'http://localhost:9020/admin',
                             'Load': 'http://localhost:9020/productos/load/'})
    

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        import json
        data = json.loads(request.body)

        nombre = data.get('nombre')
        apellido = data.get('apellido')
        correo = data.get('correo')
        contraseña = data.get('contraseña')

        if not all([nombre, apellido, correo, contraseña]):
            return JsonResponse({'errors': 'Todos los campos son obligatorios'}, status=400)

        if Persona.objects.filter(correo=correo).exists():
            return JsonResponse({'errors': 'El correo ya está registrado'}, status=400)

        persona = Persona.objects.create(
            nombre=nombre,
            apellido=apellido,
            correo=correo,
            contraseña=contraseña
        )

        if persona:
            return JsonResponse({'message': 'Usuario registrado exitosamente'}, status=201)
        else:
            return JsonResponse({'errors': 'Error al registrar el usuario'}, status=500)

    return JsonResponse({'errors': 'Método no permitido'}, status=405)



def login_view(request):
    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')  # Redirige al inicio o a cualquier otra vista
    else:
        form = LoginForm()
    return render(request, 'productos/login.html', {'form': form})

@login_required
def protected_view(request):
    # Lógica de la vista
    return render(request, 'productos/protected.html')

def logout_view(request):
    logout(request)
    return redirect('index')

class JSONResponseOk(HttpResponse):
    def __init__(self, data, msg,**kwargs):
        #print("data",data)
        data= {"OK":True,"count":"1","registro":data,"msg":msg}
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponseOk, self).__init__(content, **kwargs)

class JSONResponseErr(HttpResponse):
    def __init__(self, data, **kwargs):
        data= {"OK":False,"count":"0","msg":data}
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponseErr, self).__init__(content, **kwargs)


#PERSONA

class PersonaList(APIView):
    def get(self, request, format=None):
        registro = Persona.objects.all()
        serializer = PersonaSerializer(registro, many=True)
        data = {
            'OK': True,
            'registro': serializer.data
        }
        return Response(data)

    def post(self, request, format=None):
        #print("1,Post",request)
        # insert en la tabla cliente
        # insert en la tabla Persona
        data = JSONParser().parse(request)
        #print("1",data)
        registro = PersonaSerializer(data=data)
        #print("2",registro)
        if registro.is_valid():
            #print("3")
            # Enviar harrys
            registro.save()
            #print("4")
            return JSONResponseOk(registro.data, status=status.HTTP_201_CREATED,msg="")
        #return JSONResponseErr(registro.errors, status=status.HTTP_400_BAD_REQUEST)
        # Envimaos como Okey el Http, pero con mensaje de Error
        return JSONResponseErr(registro.errors, status=status.HTTP_201_CREATED)
    
class PersonaDetail(APIView):
    def get_object(self, pk):
        try:
            return Persona.objects.get(pk=pk)
        except Persona.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        #print("Persona Rut",pk)
        registro = self.get_object(pk)
        #print("Registro Rut",registro)
        serializer = PersonaSerializer(registro)
        #print("Registro serializer",serializer)
        return JSONResponseOk(serializer.data,msg="")

    def put(self, request, pk, format=None):
        registro = self.get_object(pk)
        data = JSONParser().parse(request)
        serializer = PersonaSerializer(registro, data=data, partial=True)  # Usar partial=True para actualizar solo los campos que vienen en la solicitud
        if serializer.is_valid():
            serializer.save()
            return JSONResponseOk(serializer.data, msg="Registro actualizado")
        return JSONResponseErr(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class PersonaDelete(APIView):
    def get_object(self, pk):
        try:
            return Persona.objects.get(pk=pk)
        except Persona.DoesNotExist:
            raise Http404
    def post(self, request, pk, format=None):
        registro = self.get_object(pk)
        registro.delete()
        return JSONResponseOk('Borrado', status=status.HTTP_201_CREATED,msg="Borrado")  


#ZAPATILLA


class ZapatillaList(APIView):
    def get(self, request, format=None):
        registro = Zapatilla.objects.all()
        serializer = ZapatillaSerializer(registro, many=True)
        data = {
            'OK': True,
            'registro': serializer.data
        }
        return Response(data)

    def post(self, request, format=None):
        #print("1,Post",request)
        # insert en la tabla cliente
        # insert en la tabla Persona
        data = JSONParser().parse(request)
        #print("1",data)
        registro = ZapatillaSerializer(data=data)
        #print("2",registro)
        if registro.is_valid():
            #print("3")
            # Enviar harrys
            registro.save()
            #print("4")
            return JSONResponseOk(registro.data, status=status.HTTP_201_CREATED,msg="")
        #return JSONResponseErr(registro.errors, status=status.HTTP_400_BAD_REQUEST)
        # Envimaos como Okey el Http, pero con mensaje de Error
        return JSONResponseErr(registro.errors, status=status.HTTP_201_CREATED)
    

##-------

class ZapatillaDetail(APIView):
    def get_object(self, pk):
        try:
            return Zapatilla.objects.get(pk=pk)
        except Zapatilla.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, format=None):
        #print("Persona Rut",pk)
        registro = self.get_object(pk)
        #print("Registro Rut",registro)
        serializer = ZapatillaSerializer(registro)
        #print("Registro serializer",serializer)
        return JSONResponseOk(serializer.data,msg="")

    def put(self, request, pk, format=None):
        print("put.1**",request)
        registro = self.get_object(pk)
        print("put.2**",registro)
        data = JSONParser().parse(request)
        print("put.3**",data)
      
        serializer = ZapatillaSerializer(registro, data=data)
        if serializer.is_valid():
            print ("valid")
            serializer.save()
            #return JSONResponseOk(serializer.data)
            return JSONResponseOk(None,msg="Resistro Actualizado")
        return JSONResponseErr(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ZapatillaDelete(APIView):
    def get_object(self, pk):
        try:
            return Zapatilla.objects.get(pk=pk)
        except Zapatilla.DoesNotExist:
            raise Http404
    def post(self, request, pk, format=None):
        registro = self.get_object(pk)
        registro.delete()
        return JSONResponseOk('Borrado', status=status.HTTP_201_CREATED,msg="Borrado") 





# BOLETA (agrgar.v)

class BoletaList(APIView):
    def get(self, request, format=None):
         registro = Boleta.objects.all()
         serializer = BoletaSerializer(registro, many=True)
         return JSONResponseOkRows(serializer.data,"")
         #return Response(serializer.data)

    def post(self, request, format=None):
        #print("1,Post",request)
        # insert en la tabla cliente
        # insert en la tabla Persona
        data = JSONParser().parse(request)
        #print("1",data)
        registro = BoletaSerializer(data=data)
        #print("2",registro)
        if registro.is_valid():
            #print("3")
            # Enviar harrys
            registro.save()
            #print("4")
            return JSONResponseOk(registro.data, status=status.HTTP_201_CREATED,msg="")
        #return JSONResponseErr(registro.errors, status=status.HTTP_400_BAD_REQUEST)
        # Envimaos como Okey el Http, pero con mensaje de Error
        return JSONResponseErr(registro.errors, status=status.HTTP_201_CREATED)
    

##-------

class BoletaDetail(APIView):
    def get_object(self, pk):
        try:
            return Boleta.objects.get(pk=pk)
        except Boleta.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, format=None):
        #print("Persona Rut",pk)
        registro = self.get_object(pk)
        #print("Registro Rut",registro)
        serializer = BoletaSerializer(registro)
        #print("Registro serializer",serializer)
        return JSONResponseOk(serializer.data,msg="")

    def put(self, request, pk, format=None):
        #print("put.1**",request)
        registro = self.get_object(pk)
        #print("put.2**",registro)
        data = JSONParser().parse(request)
        #print("put.3**",data)
        serializer = BoletaSerializer(registro, data=data)
        if serializer.is_valid():
            serializer.save()
            #return JSONResponseOk(serializer.data)
            return JSONResponseOk(None,msg="Resistro Actualizado")
        return JSONResponseErr(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        registro = self.get_object(pk)
        registro.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    














