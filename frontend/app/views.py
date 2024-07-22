from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect


#TEMPLATES
def index(request):
    return render(request, 'index.html')

def mis_productos(request):
    return render(request, 'productos.html')

def quienes_somos(request):
    return render(request, 'quienesomos.html')

def contactenos(request):
    return render(request, 'contactenos.html')

def carro_compra(request):
    return render(request, 'carrito.html')

def clima(request):
    return render(request, 'clima.html')

def login(request):
    return render(request, 'login.html')

def register(request):
    return render(request, 'register.html')

def forget(request):
    return render(request, 'forget.html')

def menuadmin(request):
    return render(request, 'menuadmin.html')



def crearzapatilla(request):
    return render(request, 'menuadmin.html')
def editarzapatilla(request):
    return render(request, 'menuadmin.html')
def listarzapatilla(request):
    return render(request, 'menuadmin.html')
def eliminarzapatilla(request):
    return render(request, 'menuadmin.html')


def crearpersona(request):
    return render(request, 'menuadmin.html')
def editarpersona(request):
    return render(request, 'menuadmin.html')
def listarpersona(request):
    return render(request, 'menuadmin.html')
def eliminarpersona(request):
    return render(request, 'menuadmin.html')



#LOGIN Y LOGOUT



#PRODUCTOS

def mis_productos(request):
    productos = [
        {
            'nombre': 'ZAPATILLA PUMA FOREVERRUN NITRO FUTROGRADE',
            'id':'01',
            'precio': 139.990,
            'stock': 10,
            'descripcion': 'Descripción del producto 1',
            'foto': '1.jpg',
        },
        {
            'nombre': 'ZAPATILLA PUMA FOREVERRUN NITRO FUTROGRADE',
            'id':'02',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'ZAPATILLA PUMA FOREVERRUN NITRO FUTROGRADE',
            'foto': '2.jpg',
        },
        {
            'nombre': 'ZAPATILLA ADIDAS SAMBA OG',
            'id':'03',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'ZAPATILLA ADIDAS SAMBA OG',
            'foto': '3.jpg',
        },
        {
            'nombre': 'ZAPATILLA ADIDAS SAMBA OG CLOUD',
            'id':'04',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'ZAPATILLA ADIDAS SAMBA OG CLOUD',
            'foto': '4.jpg',
        },
        {
            'nombre': 'ZAPATILLA JORDAN AIR 13 RETRO',
            'id':'05',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'ZAPATILLA JORDAN AIR 13 RETRO',
            'foto': '5.jpg',
        },
        {
            'nombre': 'ZAPATILLA JORDAN WMNS AIR 3',
            'id':'06',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '6.jpg',
        },
        {
            'nombre': 'ZAPATILLA JORDAN JUNIOR AIR 3',
            'id':'07',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '7.jpg',
        },
        {
            'nombre': 'ZAPATILLA JORDAN NIÑO AIR 3 RETRO',
            'id':'08',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '8.jpg',
        },
        {
            'nombre': 'ZAPATILLA JORDAN AIR 3 RETRO',
            'id':'09',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '9.jpg',
        },
        {
            'nombre': 'ZAPATILLA NEW BALANCE 9060',
            'id':'10',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '10.jpg',
        },
        {
            'nombre': 'ZAPATILLA ADIDAS SUPERSTAR',
            'id':'11',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '11.jpg',
        },
        {
            'nombre': 'ZAPATILLA ADIDAS FORUM MID',
            'id':'12',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '12.jpg',
        },
        {
            'nombre': 'ZAPATILLA PUMA UNISEX SLIPSTREAM',
            'id':'13',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '13.jpg',
        },
        {
            'nombre': 'ZAPATILLA PUMA UNISEX SLIPSTREAM',
            'id':'14',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '14.jpg',
        },
        {
            'nombre': 'ZAPATILLA PUMA UNISEX SLIPSTREAM',
            'id':'15',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '15.jpg',
        },
        {
            'nombre': 'ZAPATILLA PUMA UNISEX SLIPSTREAM',
            'id':'16',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '16.jpg',
        },
        {
            'nombre': 'TRAINER BLACK/ELEKTRO AQUA',
            'id':'17',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '17.jpg',
        },
        {
            'nombre': 'ZAPATILLA JORDAN AIR 3 RETRO',
            'id':'18',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '18.jpg',
        },
        {
            'nombre': 'ZAPATILLA PUMA X NICKELODEON',
            'id':'19',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '19.jpg',
        },
        {
            'nombre': 'ZAPATILLA NIKE AIR FORCE 1 MID',
            'id':'19',
            'precio': 139.990,
            'stock': 5,
            'descripcion': 'Descripción del producto 2',
            'foto': '20.jpg',
        },
        # Agrega más productos según sea necesario
    ]

    context = {
        'productos': productos
    }

    return render(request, 'productos.html', context)

@login_required
def menu(request):
    request.session["persona"]="agonzalez"
    persona=request.session["persona"]
    context = {'persona':persona}
    return render(request, 'index.html', context)

def home(request):
    context = {}
    return render(request, 'index.html')