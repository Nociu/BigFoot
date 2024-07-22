from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect


#TEMPLATES



def crearzapatilla(request):
    return render(request, 'crearzapatilla.html')
def editarzapatilla(request,id):
    dictcontext = {
        'id': id
    }
    return render(request, 'editarzapatilla.html',context=dictcontext)
def listarzapatilla(request):
    return render(request, 'listarzapatilla.html')
def eliminarzapatilla(request):
    return render(request, 'menuadmin.html')
def zapatilladetalle(request,id):
    context = {
        'id': id
    }
    return render(request, 'zapatilladetalle.html', context)



def crearpersona(request):
    return render(request, 'crearpersona.html')
def editarpersona(request,id):
    dictcontext = {
        'id': id
    }
    return render(request, 'editarpersona.html',context=dictcontext)
def listarpersona(request):
    return render(request, 'listarpersona.html')
def eliminarpersona(request):
    return render(request, 'menuadmin.html')
def personadetalle(request,id):
    context = {
        'id': id
    }
    return render(request, 'personadetalle.html', context)




#LOGIN Y LOGOUT



#PRODUCTOS
# http://127.0.0.1:8000/productos/zapatilla/