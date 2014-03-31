var inicializado = false;

var latitud;
var longitud;

$(document).ready(function(){
	sagardo_init();
});


function sagardo_init(){

	//para que solo se ejecute una vez:
	if (!inicializado){

		

		inicializado = true;

		$("#distancia").change(function(){
			if ($("#distancia").val()) buscarSagardos($("#distancia").val());

		});

		navigator.geolocation.getCurrentPosition(geoLocExito,geoLocError,{enableHighAccuracy:true});
		
	}

}

function geoLocExito(position){
	latitud = position.coords.latitude;
	longitud = position.coords.longitude; 


	buscarSagardos($("#distancia").val());
}

function geoLocError(error){
	alert("No se ha detectado la ubicación");

	//datos de pruebas
	latitud = "43.3174604";
	longitud = "-1.9685667";

	buscarSagardos($("#distancia").val());
}




function buscarSagardos(distancia){
	url = "http://www.sagardotegi.eu/geo/";

	$.post( url, { latitud: latitud, longitud: longitud, distancia: distancia }, function(data){
			$("#listado").html(data);
			convertirEnlaces();
		},"html");

}

function convertirEnlaces(){

	$(".listaMovil li").each(function(){
		$(this).click(function(){
			$(this).addClass("tocado");
			carpeta = $(this).attr("id").substring(4);
			document.location.href = "http://www.sagardotegi.eu/sidrerias/" + carpeta + "/";
		});
	});

}
