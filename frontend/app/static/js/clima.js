function DrawWeatherTutiempo(data)
{
var htmld="",htmlh="",dhcach="",meses = new Array('-','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
htmld += '<div class="header"><h2>El tiempo en '+data.locality.name+'</h2><p>Pronóstico 7 días | El tiempo por Tutiempo.net</p></div>';
htmlh += '<div class="header" style="padding-top:20px;"><h2>El tiempo por horas en '+data.locality.name+'</h2><p>Próximas 24 horas | Datos de Tutiempo.net</p></div>';
	for(var k in data)
	{
		if(k.indexOf("day")>-1)
		{
		var res = data[k].date.split("-");
		htmld += '<div class="daydata">';
		htmld += '<h3 class="date">'+res[2]+' de '+meses[res[1]]+' de '+res[0]+'</h3>';
		htmld += '<p class="it"><img alt="'+data[k].text+'" title="'+data[k].text+'" height="50" src="https://v5i.tutiempo.net/wi/01/50/'+data[k].icon+'.png" width="50" />'+data[k].temperature_max+'&deg;C<br />'+data[k].temperature_min+'&deg;C</p>';
		htmld += '<p class="wind"><img alt="'+data[k].wind_direction+'" title="'+data[k].wind_direction+'" height="50" src="https://v5i.tutiempo.net/wd/big/black/'+data[k].icon_wind+'.png" width="50" />'+data[k].wind+' km/h</p>';
		htmld += '<p class="oc">Humedad: '+data[k].humidity+'%<br />Salida sol: '+data[k].sunrise+'<br />Puesta sol: '+data[k].sunset+'</p>';
		htmld += '<p class="moon"><img alt="" height="50" src="https://v5i.tutiempo.net/wmi/02/'+data[k].moon_phases_icon+'.png" width="50" />Salida luna: '+data[k].moonrise+'<br />Puesta luna: '+data[k].moonset+'</p>';
		htmld += '</div>';
		}
		else if(k.indexOf("hour_hour")>-1)
		{
			for(var kh in data[k])
			{
			var res = data[k][kh].date.split("-");
			htmlh += '<div class="daydata">';
			if(dhcach != data[k][kh].date){dhcach = data[k][kh].date; htmlh += '<h3 class="date">'+res[2]+' de '+meses[res[1]]+' de '+res[0]+'</h3>';}
			htmlh += '<p class="time"><strong>'+data[k][kh].hour_data+'</strong> | '+data[k][kh].text+'</h3>';
			htmlh += '<p class="wind"><img alt="'+data[k][kh].text+'" title="'+data[k][kh].text+'" height="50" src="https://v5i.tutiempo.net/wi/01/50/'+data[k][kh].icon+'.png" width="50" />'+data[k][kh].temperature+'&deg;C</p>';
			htmlh += '<p class="wind"><img alt="'+data[k][kh].wind_direction+'" title="'+data[k][kh].wind_direction+'" height="50" src="https://v5i.tutiempo.net/wd/big/black/'+data[k][kh].icon_wind+'.png" width="50" />'+data[k][kh].wind+' km/h</p>';
			htmlh += '<p class="oc" style="line-height:25px;">Humedad: '+data[k][kh].humidity+'%<br />Presión: '+data[k][kh].pressure+'</p>';
			htmlh += '</div>';
			}
		}
	}
document.getElementById("WidgetTutiempo").innerHTML = htmld+'<p class="linkTT"><a href="'+data.locality.url_weather_forecast_15_days+'" target="_blank" rel="nofollow">Predicción 15 días</a></p>'+htmlh+'<p class="linkTT"><a href="'+data.locality.url_hourly_forecast+'" target="_blank" rel="nofollow">Ver pronóstico por horas 14 días</a></p>';
}

function LoadJSONTuTiempo()
{
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){if(this.readyState == 4 && this.status == 200){var data = JSON.parse(this.responseText); DrawWeatherTutiempo(data);}};
xhttp.open("GET","https://api.tutiempo.net/json/?lan=es&apid={XxYzqzzzzaaN88t}&lid=3768",true);
xhttp.send();
}
LoadJSONTuTiempo();