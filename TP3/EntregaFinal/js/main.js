'use strict'

const MiliSegundos=1000;

let saltar = false;
let morir = false;
let fin = false;
let interval;
let reloj = null;
let puntos = 0;
let colAbeja = false;
let colAnillo = false;
let mostrarCartel = false;
let cartel =  document.getElementById("cartel");
let puntaje = document.getElementById("puntaje");
let sonic = document.getElementById("sonic");
let obstaculo = document.querySelector(".obstaculo");
let obstaculo2 = document.querySelector(".obstaculo2");
let anillo = document.querySelector(".anillo");
let cielo = document.getElementById("cielo");
let islasYmar = document.getElementById("islas_y_mar");
let piso =document.getElementById("piso");
let t = document.getElementById("tiempo");
let palabraTiempo = document.getElementById("cartel2");
let btnReiniciar = document.querySelector(".reiniciar");
btnReiniciar.addEventListener("click",reiniciar);

function reiniciar(){
    window.location.reload();
}


document.addEventListener("keydown", event =>{
    if(event.code == "ArrowUp"){
        saltar = true;
        cambiarClase(saltar)
    }
});


//Cambia sonic caminando por sonic saltando, hecho una bolita
function cambiarClase(saltar){
    if(saltar){
    sonic.setAttribute("class","saltando");
    }
    else
    sonic.setAttribute("class","caminando");
    
}

// luego de que sonico salta hecho una bolita, vuelve a caminar
sonic.addEventListener("animationend", function() { cambiarClase(false)})


// Cambia sonic caminando por una explosión
function cambiarClase2(morir){
    if(morir){
        sonic.setAttribute("class","morir");
    }       
}
// Muestra cartel de que ha perdido tiempo
function mostraCartel(mostrarCartel){
    
    if(mostrarCartel){
        cartel.setAttribute("class","cartel");
        }
        else
        cartel.setAttribute("class","oculto");
}
cartel.addEventListener("animationend", function() {  mostraCartel(false)})

function colisionAbeja(){
      return  obstaculo2.getBoundingClientRect();
        
}
//obstaculo2.addEventListener("animationend", function() {  colisionAbeja(false)})




function colisionAnillo(){
let aTop = anillo.getBoundingClientRect().top
    aLeft = anillo.offsetLeft
   
}
//anillo.addEventListener("animationend", function() {  colisionAnillo(false)})

//Pone en pausa todas las animaciones al terminar el juego
function pausarAnimaciones(){

        sonic.style.animationPlayState = "paused";
        obstaculo.style.animationPlayState = "paused";
        cielo.style.animationPlayState = "paused";
        islasYmar.style.animationPlayState = "paused";
        piso.style.animationPlayState = "paused";
        anillo.style.animationPlayState = "paused"; 
        obstaculo2.style.animationPlayState = "paused"; 
       
}

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------


//ejecuta la función detectarColisión cada 1000 milisegundos
setInterval(detectarColision,500);


//Detecta si el div de sonic colisiona con el div del pincho, la abeja o el anillo
function detectarColision(){ 
    morir = false;
    if (fin == false){
            
    let sonicPos = sonic.getBoundingClientRect();       
    let pinchoPos =  obstaculo.getBoundingClientRect();
    let abejaPos =  obstaculo2.getBoundingClientRect();
    let anilloPos = anillo.getBoundingClientRect();
    let abejaWidht = abejaPos.left + abejaPos.width;
    let abejaHeight = abejaPos.top + abejaPos.height;
    let sonicWidht = sonicPos.left + sonicPos.width;
    let sonicHeight = sonicPos.top + sonicPos.height;
    let anilloWidht = anilloPos.left + anilloPos.width;
    let anilloHeight = anilloPos.top + anilloPos.height;
    let pinchoWidht = pinchoPos.left + pinchoPos.width;
    let pinchoHeight = pinchoPos.top + pinchoPos.height; 

    //si sonic colisiona con la abeja se descuenta tiempo
    if( sonicPos.left<=abejaWidht && 
        sonicWidht>=abejaPos.left && 
        sonicHeight>=abejaPos.top && 
        sonicPos.top <= abejaHeight  ){
        //    this.position.top = this.div.getBoundingClientRect().top;
       
            morir= true;
            cambiarClase2(morir);
            mostrarCartel = true; 
            mostraCartel(mostrarCartel)
            reloj.descontarTiempo(); 
            
           
    }

    //si sonic colisiona con el pincho se descuenta tiempo
    if( sonicPos.left<=pinchoWidht && 
        sonicWidht>=pinchoPos.left && 
        sonicHeight>=pinchoPos.top && 
        sonicPos.top <= pinchoHeight  ){ 
            morir= true;
            cambiarClase2(morir);
            mostrarCartel = true; 
            mostraCartel(mostrarCartel)
            reloj.descontarTiempo();
           
    }

    //si sonic colisiona con el anillo se suma puntaje
   
    if(sonicPos.left<=anilloWidht && 
        sonicWidht>=anilloPos.left && 
        sonicHeight>=anilloPos.top && 
        sonicPos.top <= anilloHeight){
               
           if(fin == false)
                sumarPuntos();
           if (puntos == 10){
            swal('Ganaste el juego, GAME OVER...', ' ', 'success'); 
           
           // interval=null;
           // tiempoDeJuego()
            finJuego();
           }
          
    }

    }
    
 
      return morir;    
  
  }


// acumula los puntos obtenidos
  function sumarPuntos(){
    puntos++;
    puntaje.innerHTML= puntos;
  }

  // muestra el tiempo de juego que resta para terminar
  function tiempoDeJuego(){
  
    if (interval != null){
      clearInterval(interval);
    }
    
    reloj = new Tiempo(3,t);
    
    if(fin == false){
        interval = setInterval(function(){
            reloj.calcularTiempo();
           
            if( reloj.calcularTiempo()<60 && reloj.calcularTiempo()>0){
                palabraTiempo.setAttribute("class","colorRojo");
            }   
          },MiliSegundos);
    }
    
   
   // inicia el juego
  }
  function iniciarJuego(){
     
    tiempoDeJuego();
  }

  // finaliza el juego
  function  finJuego(){
      fin = true;
      pausarAnimaciones();
      clearInterval(interval);
      reloj.detenerTiempo();
      btnReiniciar.classList.remove("ocult");
      btnReiniciar.classList.add("desocultar");
      
    
  
     
  }


  iniciarJuego();