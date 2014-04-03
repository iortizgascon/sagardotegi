var inicializar=true;

var latitud="43.3174604";
var longitud="-1.9685667";

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
		//para probar con FF buscarSagardos($("#distancia").val());
	}
}

function geoLocExito(position){

	latitud = position.coords.latitude;
	longitud = position.coords.longitude; 

	buscarSagardos($("#distancia").val());
}

function geoLocError(error){
	alert("No se ha detectado la ubicación");
	
	buscarSagardos($("#distancia").val());
}


function bindLinkList(){
	$( "a" ).on( "click", function( event ) {

		event.preventDefault();
		
		$.mobile.changePage( "#ficha",{ transition: "slide"});
		cargarFicha( $(this).attr("href") );

	});	
}


	


function buscarSagardos(distancia){
 
	$.mobile.loading("show");

	$( "#list-switch" ).trigger("click");

	url = "http://www.sagardotegi.eu/geo/";

	$.post( url, { latitud: latitud, longitud: longitud, distancia: distancia }, function(data){
			$("#list-results").html(data);
			$('#list-results').listview('refresh');
			 bindLinkList();
			$.mobile.loading("hide");
			
		});

}

function cargarFicha(carpeta){
	url = "http://www.sagardotegi.eu/geo/ficha/";
	$.post( url, { carpeta: carpeta }, function(data){
		$("#ficha").html(data).trigger('create');	
	});
}


// MAPA

$( document ).on( "pagecreate", "#map-page", function() {
    var $mapSwitch = $( "#map-switch" ),
        $listSwitch = $( "#list-switch" ),
        $map = $( "#map-canvas" ),
        $list = $( "#list-canvas" );
    $mapSwitch.on( "click", function( e ){
        $map.show();
        $map.gmap();
        $list.hide();

    });
    $listSwitch.on( "click", function( e ){
        $list.show();
        $map.hide();
    });
   
});



