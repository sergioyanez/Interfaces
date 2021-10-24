'use strict'
let saltar = false;
let morir = false;
let fin = false;
let interval;
let reloj = null;
let puntos = 0;
const MiliSegundos=1000;
let puntaje = document.getElementById("puntaje");
let sonic = document.getElementById("sonic");
let obstaculo = document.querySelector(".obstaculo");
let obstaculo2 = document.querySelector(".obstaculo2");
let anillo = document.querySelector(".anillo");
let cielo = document.getElementById("cielo");
let islasYmar = document.getElementById("islas_y_mar");
let piso =document.getElementById("piso");
let t = document.getElementById("tiempo");
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


function cambiarClase2(morir){
    if(morir){
        sonic.setAttribute("class","morir");
    }       
}

function pausarAnimaciones(){

        sonic.style.animationPlayState = "paused";
        obstaculo.style.animationPlayState = "paused";
        cielo.style.animationPlayState = "paused";
        islasYmar.style.animationPlayState = "paused";
        piso.style.animationPlayState = "paused";
        anillo.style.animationPlayState = "paused"; 
        obstaculo2.style.animationPlayState = "paused"; 
       
}
function cambiarClase2(morir){
    if(morir){
        sonic.setAttribute("class","morir");
    }
       
}


//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

//let anillo = document.querySelector(".anillo");

setInterval(detectarColision,1000);

function detectarColision(){ 
    morir = false;     
    let sonicPos = sonic.getBoundingClientRect();       
    let obstaculoPos =  obstaculo.getBoundingClientRect();
    let abejaPos =  obstaculo2.getBoundingClientRect();
    let anilloPos =anillo.getBoundingClientRect();
    let abejaWidht = abejaPos.left + abejaPos.width;
    let abejaHeight = abejaPos.top + abejaPos.height;
    let sonicWidht = sonicPos.left + sonicPos.width;
    let sonicHeight = sonicPos.top + sonicPos.height;
    let anilloWidht = anilloPos.left + anilloPos.width;
    let anilloHeight = anilloPos.top + anilloPos.height;
    let obstaculoWidht = obstaculoPos.left+obstaculoPos.width;
    let obstaculoHeight = obstaculoPos.top+obstaculoPos.height; 

    if( sonicPos.left<=abejaWidht && 
        sonicWidht>=abejaPos.left && 
        sonicHeight>=abejaPos.top && 
        sonicPos.top <= abejaHeight  ){ 
            morir= true;
            cambiarClase2(morir);
            reloj.descontarTiempo();
    }
    if( sonicPos.left<=obstaculoWidht && 
        sonicWidht>=obstaculoPos.left && 
        sonicHeight>=obstaculoPos.top && 
        sonicPos.top <= obstaculoHeight  ){ 
            morir= true;
            cambiarClase2(morir);
            reloj.descontarTiempo();
    }


    if( sonicPos.left<=anilloWidht && 
        sonicWidht>=anilloPos.left && 
        sonicHeight>=anilloPos.top && 
        sonicPos.top <= anilloHeight  ){
            if(fin == false)
                sumarPuntos();
           if (puntos == 10){
            swal('Ganaste el juego', ' ', 'success'); 
            interval=null; ;
            tiempoDeJuego()
            finJuego();
           }
           
    }
 
      return morir;    
  
  }

  function sumarPuntos(){
    puntos++;
    puntaje.innerHTML= puntos;
  }

  function tiempoDeJuego(){
  
    if (interval != null){
      clearInterval(interval);
    }
    
    reloj = new Tiempo(10,t);
    if(fin == false){
        interval = setInterval(function(){
            reloj.calcularTiempo();   
          },MiliSegundos);
    }
    
   
   
  }
  function iniciarJuego(){
    tiempoDeJuego();
  }

  function  finJuego(){
      fin = true;
   pausarAnimaciones();
     
  }
  iniciarJuego();