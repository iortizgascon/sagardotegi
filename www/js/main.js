var inicializar=true;

var latitud;
var longitud;

$(document).ready(function(){
	sagardo_init();
});


function sagardo_init(){

	if (inicializar){
		inicializar = false; // para que solo arranque por un sitio.

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


function bindLinkList(){
	$( "#listado a" ).on( "click", function( event ) {
		
		event.preventDefault();
		
		$.mobile.navigate( "#ficha");
		cargarFicha( $(this).attr("href") );
	});
	
}


function buscarSagardos(distancia){
	url = "http://www.sagardotegi.eu/geo/";

	$.post( url, { latitud: latitud, longitud: longitud, distancia: distancia }, function(data){
			$("#listado").html(data);
			 bindLinkList();
			
		});

}

function cargarFicha(carpeta){

$("#ficha").html("cargando...");	
	url = "http://www.sagardotegi.eu/geo/ficha/";

	$.post( url, { carpeta: carpeta }, function(data){
		
		$("#ficha").html(data);			
	});

}


