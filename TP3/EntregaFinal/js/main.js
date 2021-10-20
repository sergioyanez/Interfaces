'use strict'
let saltar = false;
let sonic = document.getElementById("sonic");
document.addEventListener("keydown", event =>{
    if(event.code == "ArrowUp"){
        saltar = true;
        cambiarClase(saltar);
     //   alert("flecha arriba");
    }
});

function cambiarClase(saltar){
    if(saltar){
    sonic.setAttribute("class","saltando");
    }
    else
    sonic.setAttribute("class","caminando");
    
}


sonic.addEventListener("animationend", function() { cambiarClase(false)})