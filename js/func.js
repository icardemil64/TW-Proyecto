var script = document.createElement('script');
var contObjetos = 0;
var arrayObjetos;
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
$(document).ready(function () {
    //Aquí viene lo chido
    console.log(";D")
    $.ajax(
        {   url:'js/series.json',
            mimeType: "application/json",
            success: function(objetos) {
                console.log(objetos);
                arrayObjetos = objetos;
                console.log(objetos.length);
                /** Agrega los elementos en la página**/
                for(contObjetos=0;contObjetos <objetos.length;contObjetos++){
                    if(contObjetos===0 || contObjetos%3===0)
                    {   $("#contenedorSeries").append('<div class="row text-center">');
                    }
                    $("#contenedorSeries").append('<div class="col-sm-4"><div class="thumbnail"><img class="img-cartel" src="img/'+objetos[contObjetos].imagen+'"><p><strong>'+objetos[contObjetos].nombre+'</strong></p><p>Estreno DD/MM/AA</p><button id="verMas" class="btn" data-toggle="modal" data-target="#infoPelicula" value="' + objetos[contObjetos].id +'" >Ver más</button></div></div>');
                    if(contObjetos===0 || contObjetos%3===0 || contObjetos === objetos.length-1)
                    {
                        $("#contenedorSeries").append('</div>');
                    }
                }
            }
        }
    )
    $("#contenedorTrailer").hide();
    $("#contenedorInformacion").hide();
    $("#verInfo").click(function() {
        $("#contenedorInformacion").fadeToggle(200);
    });
    $("#verTrailer").click(function() {
        $("#contenedorTrailer").fadeToggle(200);
    });
    $("#infoPelicula").on("hidden.bs.modal", function(){
        $("#contenedorTrailer").hide();
        $("#contenedorInformacion").hide();
    });
});
$(document).on("click","#verMas",function() {
    var key = $(this).attr('value');
    for(contObjetos=0;contObjetos < arrayObjetos.length;contObjetos++){
        if(arrayObjetos[contObjetos].id == key){
            var indice = contObjetos;
            contObjetos = arrayObjetos.length;
        }
    }
    console.log(arrayObjetos[indice]);
    $("#tituloPelicula").html('<p>'+arrayObjetos[indice].nombre+'</p>');
    $("#imagenModal").attr("src","img/"+arrayObjetos[indice].imagen);
    $("#trailer").attr("src",arrayObjetos[indice].trailer+"?rel=0&amp;showinfo=0");
});
