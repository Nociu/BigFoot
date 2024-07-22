    // Definimos la parte fija de la Url
    var url_api= 'http://localhost:9030/admin/frontend/'    
    //var lo_path = 'persona/'
    var lo_path = 'admin/'

    function validaEmpleadoHeader(){
        //alert(99)
        //alert($('#txRut').value)
        if (document.getElementById('txRut').value==""){
            msgHarrys.mensaje("Empleado","Ingrese Rut")
            document.getElementById('txRut').focus()
            return false
        }
        if (document.getElementById('txDv').value==""){
            msgHarrys.mensaje("Empleado","Ingrese Dígito Verificador")
            document.getElementById('txDv').focus()
            return false
        }

        return true
    }

    function validaEmpleadoBodyV0(){
        if (!validaEmpleadoHeader()) return
        //alert($('txRut').value)
        if (document.getElementById('txNombres').value==""){
            msgHarrys.mensaje("Empleado","Ingrese Nombre")
            document.getElementById('txNombres').focus()
            return false
        }
        if (document.getElementById('txPaterno').value==""){
            msgHarrys.mensaje("Empleado","Ingrese Ap.Paterno")
            document.getElementById('txPaterno').focus()
            return false
        }

        return true
    }

    function validaEmpleadoBody(){
        
        var msg=""
        if (document.getElementById('txNombres').value==""){
            msg+="Ingrese Nombres"
            document.getElementById('txNombres').focus()
        }
        if (document.getElementById('txPaterno').value==""){
            msg+="\nIngrese Paterno"
            document.getElementById('txPaterno').focus()
        }
        //alert(msg)
        if (msg != ""){
            msgHarrys.mensaje("Empleado",msg)
            return false
        }

        return true
    }


    function empleadoAgregar(){
        if (!validaEmpleadoBody()) return
        var parametros=""
        // Creo Datos para enviar tipo Para Form
        // parametros = "p_rut=" + document.getElementById("txRut").value;
        // parametros += "&p_nombre=" + document.getElementById("txNombres").value;
        // parametros += "&p_paterno=" + document.getElementById("txPaterno").value;
        // parametros += "&p_materno=" + document.getElementById("txMaterno").value;
        // parametros += "&p_email=" + document.getElementById("txEmail").value;

        // Creo Texto con los datos en formato json
        parametros = "{"
        parametros += ' "rut":"' + document.getElementById('txRut').value + '"';
        parametros += ',"dv":"' + document.getElementById('txDv').value + '"';
        parametros += ',"nombre":"' + document.getElementById('txNombres').value+ '"';
        parametros += ',"apellido":"' + document.getElementById('txPaterno').value+ '"';
        parametros += ',"sapellido":"' + document.getElementById('txMaterno').value+ '"';
        parametros += ',"email":"'  + document.getElementById('txEMail').value+ '"';
        parametros += ',"comuna":"' + document.getElementById('cbComuna').value  +'"' 
        parametros += ',"genero":"' + document.getElementById('cbGenero').value  +'"' 
        parametros += "}"
        //alert("hola" + parametros)
        //*********** Ejecuto Ajax Sincrónico
        $.ajax({
            type: "POST",      // GET, PUT, POST, DELETE
            data: parametros,  // Envio deParámetro
            async: false,      // Sincrónico
            url: url_api + lo_path  ,  // Url de la API
            cache: false,
            dataType: "json",             // Formato de envio
            beforeSend: function (data){
                // Método de ejecuta antes de enviar
                console.log('... cargando...');
            }
            , error: function (data) {
                //alert("Error " + data)
                //si hay un error mostramos un mensaje
                //alert(data.msg)
                console.log('Tenemos problemas Houston ' + data);
            },
            success: function (data) {
                //alert("Success" + data)
                json = data;
                //alert(json.OK)
                // Si no es Ok envia Mensaje
                if (!json.OK){
                    alert(JSON.stringify(json.msg))
                    return
                }
                //alert("Success" + JSON.stringify(data))
                alert(json.msg)
                limpiar()

            }
        });
    }
    function empleadoActualizar(){
        if (!validaEmpleadoBody()) return
        var parametros=""
        // Creo Texto con los datos en formato json
        
        parametros = "{"
        parametros += ' "rut":"' + document.getElementById('txRut').value + '"';
        parametros += ',"dv":"' + document.getElementById('txDv').value + '"';
        parametros += ',"nombre":"' + document.getElementById('txNombres').value+ '"';
        parametros += ',"apellido":"' + document.getElementById('txPaterno').value+ '"';
        parametros += ',"sapellido":"' + document.getElementById('txMaterno').value+ '"';
        parametros += ',"email":"'  + document.getElementById('txEMail').value+ '"';
        parametros += ',"comuna":"'+ document.getElementById('cbComuna').value +'"' 
        parametros += ',"genero":"' + document.getElementById('cbGenero').value  +'"' 
        parametros += "}"
        //alert("hola" + parametros)
        //*********** Ejecuto Ajax Sincrónico
        $.ajax({
            type: "PUT",      // GET, PUT, POST, DELETE
            data: parametros,  // Envio deParámetro
            async: false,      // Sincrónico
            url: url_api + lo_path +  document.getElementById('txRut').value  ,  // Url de la API
            cache: false,
            dataType: "json",             // Formato de envio
            beforeSend: function (data){
                // Método de ejecuta antes de enviar
                console.log('... cargando...');
            }
            , error: function (data) {
                //alert("Error " + data)
                //si hay un error mostramos un mensaje
                console.log('Tenemos problemas Houston ' + JSON.stringify(data));
            },
            success: function (data) {
                json = data;
                // Si no es Ok envia Mensaje
                if (!json.OK){
                    alert(json.msg)
                    return
                }
                //alert("Success" + JSON.stringify(data))
                alert(json.msg)
                limpiar()
            }
        });
    }

    function empleadoLeer(){
        if (!validaEmpleadoHeader()) return
        // No Tiene parametros
        //*********** Ejecuto Ajax Sincrónico
        var pathUrl= url_api + lo_path +  document.getElementById('txRut').value
        $.ajax({
            type: "GET",      // GET, PUT, POST, DELETE
            async: false,      // Sincrónico
            url:pathUrl  ,  // Observe que agrego el rut
            cache: false,
            //contentType: "application/json; charset=utf-8",
            // crossDomain:true,  // Si no se coloca da error, diferentes host
            // headers: { // Bloqueado por CORS
            //         'Access-Control-Allow-Origin': '*',
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json;charset=UTF-8',
            //         'Access-Control-Allow-Methods': '*',
            //         'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
            //         },            
            //format: "json",

            dataType: "json",             // Formato de envio
            beforeSend: function (data){
                // Método de ejecuta antes de enviar
                console.log('... cargando...');
            }
            , error: function (data) {
                alert("Error " + data)
                //si hay un error mostramos un mensaje
                console.log('Tenemos problemas Houston ' +JSON.stringify(data));
                // No es Totalmente cierto, ya que puede ser error
                document.getElementById('txDv').value = "9"
                document.getElementById('txNombres').value = ""
                document.getElementById('txPaterno').value = ""
                document.getElementById('txMaterno').value = ""
                document.getElementById('txEMail').value = ""
                document.getElementById('cbComuna').value = 1
                habilitaLeer()
            },
            success: function (data) {
                //alert("Success" + data)
                json = data;
                // Si no es Ok envia Mensaje
                if (!json.OK){
                    alert(json.msg)
                    return
                }
                document.getElementById('txDv').value = json.registro.dv
                document.getElementById('txNombres').value = json.registro.nombre
                document.getElementById('txPaterno').value = json.registro.apellido
                document.getElementById('txMaterno').value = json.registro.sapellido
                document.getElementById('txEMail').value = json.registro.email
                document.getElementById('cbComuna').value = json.registro.comuna
                document.getElementById('cbGenero').value = json.registro.genero
                habilitaLeer()
            }
        });
    }
    function empleadoEliminar(){
        if (!validaEmpleadoBody()) return
        var pathUrl= url_api + lo_path +  document.getElementById('txRut').value
        $.ajax({
            type: "DELETE",      // GET, PUT, POST, DELETE
            async: false,      // Sincrónico
            url:pathUrl  ,  // Observe que agrego el rut
            cache: false,
            //contentType: "application/json; charset=utf-8",
            //crossDomain:true,  // Si no se coloca da error, diferentes host
            //format: "json",

            dataType: "json",             // Formato de envio
            beforeSend: function (data){
                // Método de ejecuta antes de enviar
                console.log('... cargando...');
            }
            , error: function (data) {
                //alert("Error " + data)
                //si hay un error mostramos un mensaje
                console.log('Tenemos problemas Houston ' +JSON.stringify(data));
            },
            success: function (data) {
                //alert("Success" + JSON.stringify(data))
                json = data;
                // Si no es Ok envia Mensaje
                if (!json.OK){
                    alert(json.msg)
                    return
                }                
                json = data;
                limpiar()
            }
        });
    }
    function empleadoListarArreglo(){
        var pathUrl= url_api + lo_path
        $.ajax({
            type: "GET",      // GET, PUT, POST, DELETE
            async: false,      // Sincrónico
            url:pathUrl  ,  // Observe que agrego el rut
            cache: false,
            dataType: "json",             // Formato de envio
            beforeSend: function (data){
                // Método de ejecuta antes de enviar
                console.log('... cargando...');
            }
            , error: function (data) {
                //alert("Error " + data)
                //si hay un error mostramos un mensaje
                console.log('Tenemos problemas Houston ' +JSON.stringify(data));
            },
            success: function (data) {
                //alert("Success" + data)
                // Si no es Ok envia Mensaje
                if (!data.OK){
                    alert(data.msg)
                    return
                }
                for(var x=0;x<data.registro.length;x++){
                       alert(data.registro[x].rut 
                              + ":" + data.registro[x].nombre
                              + ":" + data.registro[x].apellido) 
                }
            }
        });

    }
    function empleadoListarInnerHtml(){
        var pathUrl= url_api + lo_path
        $.ajax({
            type: "GET",      // GET, PUT, POST, DELETE
            async: false,      // Sincrónico
            url:pathUrl  ,  // Observe que agrego el rut
            cache: false,
            dataType: "json",             // Formato de envio
            beforeSend: function (data){
                // Método de ejecuta antes de enviar
                console.log('... cargando...');
            }
            , error: function (data) {
                //alert("Error " + data)
                //si hay un error mostramos un mensaje
                console.log('Tenemos problemas Houston ' +JSON.stringify(data));
            },
            success: function (data) {
                //alert("Success" + data)
                if (!data.OK){
                    alert(data.msg)
                    return
                }                
                var stHtml = "<br><br><br><table border='1'>"
                for(var x=0;x<data.registro.length;x++){
                       stHtml += "<tr>"
                        stHtml += "<td style='width:350px'></td>"
                       stHtml += "<td>" + data.registro[x].rut  + "</td>"
                       stHtml += "<td>" + data.registro[x].nombre  + "</td>"
                       stHtml += "<td>" + data.registro[x].apellido  + "</td>"
                       stHtml += "<td>" + data.registro[x].sapellido  + "</td>"
                       stHtml += "<td>" + data.registro[x].email  + "</td>"
                       stHtml += "</tr>"
                }
                stHtml += "</table>"
                document.getElementById("objInner").innerHTML = stHtml
            }
        });

    }
    function empleadoListarHtmlPython(){

    }
    function habilitaLeer(){
        document.getElementById('btLeer').disabled=true
        document.getElementById('btModificar').disabled=false
        document.getElementById('btAgregar').disabled=false
        document.getElementById('btEliminar').disabled=false
        document.getElementById('btLimpiar').disabled=false

        document.getElementById('txRut').disabled=true
        document.getElementById('txDv').disabled=true
        document.getElementById('txNombres').disabled=false
        document.getElementById('txPaterno').disabled=false
        document.getElementById('txMaterno').disabled=false
        document.getElementById('txEMail').disabled=false
        document.getElementById('cbComuna').disabled=false
        document.getElementById('cbRegion').disabled=false
        document.getElementById('cbProvincia').disabled=false
        document.getElementById('cbGenero').disabled=false


    }
    function limpiar() {
        //document.getElementById('txRut').value = ""
        //document.getElementById('txDv').value = ""
        document.getElementById('txNombres').value = ""
        document.getElementById('txPaterno').value = ""
        document.getElementById('txMaterno').value = ""
        document.getElementById('txEMail').value = ""
        document.getElementById('cbRegion').value = ""
        document.getElementById('cbProvincia').value = ""
        document.getElementById('cbComuna').value = ""
        document.getElementById('cbGenero').value = ""

        document.getElementById('txRut').disabled=false
        document.getElementById('txDv').disabled=false
        document.getElementById('txNombres').disabled=true
        document.getElementById('txPaterno').disabled=true
        document.getElementById('txMaterno').disabled=true
        document.getElementById('txEMail').disabled=true
        // document.getElementById('cbRegion').disabled=true
        // document.getElementById('cbProvincia').disabled=true
        // document.getElementById('cbComuna').disabled=true
        // document.getElementById('cbGenero').disabled=true


        document.getElementById('btLeer').disabled=false
        document.getElementById('btModificar').disabled=true
        document.getElementById('btAgregar').disabled=true
        document.getElementById('btEliminar').disabled=true
        document.getElementById('btLimpiar').disabled=true        
    }


  function cargaInicio(){
    limpiar()
    loadRegion()
    loadGenero()
  }  

  function loadGenero(){
        document.getElementById("cbGenero").options.length = 0;
        var pathUrl= url_api + 'genero/'
        $.ajax({
            type: "GET",      // GET, PUT, POST, DELETE
            async: false,      // Sincrónico
            url:pathUrl  ,  // Observe que agrego el rut
            cache: false,
            dataType: "json",             // Formato de envio
            beforeSend: function (data){
                // Método de ejecuta antes de enviar
                console.log('... cargando...');
            }
            , error: function (data) {
                //alert("Error " + data)
                //si hay un error mostramos un mensaje
                console.log('Tenemos problemas Houston ' +JSON.stringify(data));
            },
            success: function (data) {
                //alert("Success" + data)
                console.log("generos:",data)
                json = data;
                select = document.getElementById('cbGenero');

                var opt = document.createElement('option');
                opt.value = -1;
                opt.innerHTML = "Seleccion";
                select.appendChild(opt);

                for(var x=0;x<data.registro.length;x++){
                       //alert(data[x].rut + ":" + data[x].nombre+ ":" + data[x].apellido) 
                        var opt = document.createElement('option');
                        opt.value = json.registro[x].idGenero;
                        opt.innerHTML = json.registro[x].nombre;
                        select.appendChild(opt);
                }
                //alert(56)
            }
        });
  }
  function loadRegion(){
        document.getElementById("cbRegion").options.length = 0;
        document.getElementById("cbProvincia").options.length = 0;
        document.getElementById("cbComuna").options.length = 0;
        var pathUrl= url_api + 'region/'
        $.ajax({
            type: "GET",      // GET, PUT, POST, DELETE
            async: false,      // Sincrónico
            url:pathUrl  ,  // Observe que agrego el rut
            cache: false,
            dataType: "json",             // Formato de envio
            beforeSend: function (data){
                // Método de ejecuta antes de enviar
                console.log('... cargando...');
            }
            , error: function (data) {
                //alert("Error " + data)
                //si hay un error mostramos un mensaje
                console.log('Tenemos problemas Houston ' +JSON.stringify(data));
            },
            success: function (data) {
                //alert("Success" + data)
                json = data;
                select = document.getElementById('cbRegion');

                var opt = document.createElement('option');
                opt.value = -1;
                opt.innerHTML = "Seleccione";
                select.appendChild(opt);

                for(var x=0;x<data.registro.length;x++){
                       //alert(data[x].rut + ":" + data[x].nombre+ ":" + data[x].apellido) 
                        var opt = document.createElement('option');
                        opt.value = json.registro[x].idRegion;
                        opt.innerHTML = json.registro[x].nombre;
                        select.appendChild(opt);
                }
                //alert(56)
            }
        });
  }
  
  function loadProvincia(){
        document.getElementById("cbProvincia").options.length = 0;
        document.getElementById("cbComuna").options.length = 0;

        var pathUrl= url_api + 'provincia/' + document.getElementById('cbRegion').value
        $.ajax({
            type: "GET",      // GET, PUT, POST, DELETE
            async: false,      // Sincrónico
            url:pathUrl  ,  // Observe que agrego el rut
            cache: false,
            dataType: "json",             // Formato de envio
            beforeSend: function (data){
                // Método de ejecuta antes de enviar
                console.log('... cargando...');
            }
            , error: function (data) {
                //alert("Error " + data)
                //si hay un error mostramos un mensaje
                console.log('Tenemos problemas Houston ' +JSON.stringify(data));
            },
            success: function (data) {
                //alert("Success" + data)
                json = data;
                select = document.getElementById('cbProvincia');
                var opt = document.createElement('option');
                opt.value = -1;
                opt.innerHTML = "Seleccione";
                select.appendChild(opt);

                for(var x=0;x<data.registro.length;x++){
                       //alert(data[x].rut + ":" + data[x].nombre+ ":" + data[x].apellido) 
                        var opt = document.createElement('option');
                        opt.value = json.registro[x].idProvincia;
                        opt.innerHTML = json.registro[x].nombre;
                        select.appendChild(opt);
                }
                //alert("carga provincia")
            }
        });

  }
  function loadComuna(){
        document.getElementById("cbComuna").options.length = 0;
        var pathUrl= url_api + 'comuna/' + document.getElementById('cbProvincia').value
        $.ajax({
            type: "GET",      // GET, PUT, POST, DELETE
            async: false,      // Sincrónico
            url:pathUrl  ,  // Observe que agrego el rut
            cache: false,
            dataType: "json",             // Formato de envio
            beforeSend: function (data){
                // Método de ejecuta antes de enviar
                console.log('... cargando...');
            }
            , error: function (data) {
                //alert("Error " + data)
                //si hay un error mostramos un mensaje
                console.log('Tenemos problemas Houston ' +JSON.stringify(data));
            },
            success: function (data) {
                //alert("Success" + data)
                json = data;
                select = document.getElementById('cbComuna');
                var opt = document.createElement('option');
                opt.value = -1;
                opt.innerHTML = "Seleccione";
                select.appendChild(opt);

                for(var x=0;x<data.registro.length;x++){
                       //alert(data[x].rut + ":" + data[x].nombre+ ":" + data[x].apellido) 
                        var opt = document.createElement('option');
                        opt.value = json.registro[x].idComuna;
                        opt.innerHTML = json.registro[x].nombre;
                        select.appendChild(opt);
                }
                //alert("carga comuna")
            }
        });

  }

  //cargaInicio()