
//Variables del Canvas

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let btnIniciar = document.getElementById("btnIniciar");
    btnIniciar.addEventListener("click",iniciarJuego);
let btnReIniciar = document.getElementById("btnReIniciar");
    btnReIniciar.addEventListener("click",ReIniciarJuego);

//Variables del Tablero.
var FILAS = 6;
var COLUMNAS =7; //Por ej: que elija el valor de un select
var NUMERO_GANADOR = 4; //SE INGRESA POR INPUT 4, 5 o 6
let CANT_FICHAS = FILAS * COLUMNAS;
const TNO_FICHA = 84;
const MARGEN_TABLERO = 80;
let ANCHO_TABLERO = COLUMNAS * TNO_FICHA;
let INICIO_TABLERO = width/2-(ANCHO_TABLERO/2);
const FRONTERA = 10;   //líneas de la zona de lanzamiento
let casillero = document.getElementById("casillero");

//Variables de ficha
const RADIUS = 35;
let fichas = []; //tengo arreglo de fichas
let imgFicha1 = document.getElementById("imgP1");
let imgFicha2 = document.getElementById("imgP2");
let imgFicha3 = document.getElementById("imgP3");
let imgFicha4 = document.getElementById("imgP4");
let fichasElegidasJugador1 = false;
let fichasElegidasJugador2 = false;

 //Fichas jugador 1
 let fichaYoda = document.getElementById('yoda');
 let fichaR2d2 = document.getElementById('r2d2'); 
 let fichaC3po = document.getElementById('c3po'); 
 fichaYoda.addEventListener("click", function(){ imgFicha1 = fichaYoda;fichaR2d2.style.visibility='hidden';fichaC3po.style.visibility='hidden';fichasElegidasJugador1=true  });
 fichaR2d2.addEventListener("click", function(){ imgFicha1 = fichaR2d2;fichaYoda.style.visibility='hidden';fichaC3po.style.visibility='hidden';fichasElegidasJugador1=true  });
 fichaC3po.addEventListener("click", function(){ imgFicha1 = fichaC3po;fichaYoda.style.visibility='hidden';fichaR2d2.style.visibility='hidden';fichasElegidasJugador1=true  });
 //Fichas jugador 2
 let fichaDarthy = document.getElementById('darthy');
 let fichaBobaFet = document.getElementById('bobafet');
 let fichaStormTrooper = document.getElementById('stormtrooper');
  fichaDarthy.addEventListener("click", function(){ imgFicha2 = fichaDarthy;fichaBobaFet.style.visibility='hidden';fichaStormTrooper.style.visibility='hidden';fichasElegidasJugador2=true });
 fichaBobaFet.addEventListener("click", function(){ imgFicha2 = fichaBobaFet;fichaDarthy.style.visibility='hidden';fichaStormTrooper.style.visibility='hidden';fichasElegidasJugador2=true  });
 fichaStormTrooper.addEventListener("click", function(){ imgFicha2 = fichaStormTrooper;fichaBobaFet.style.visibility='hidden';fichaDarthy.style.visibility='hidden';fichasElegidasJugador2=true  });

//Variables del juego

let lastClicFicha = null;
let isMouseDown = false;
let jugador1="jugador1";  //tomarlo de Input
let jugador2= "jugador2";
let fichasJugadores = 0;
let zonaJuego = new ZonaJuego(ctx, width, height, COLUMNAS);
//console.log("filas tab: "+FILAS +" "+ "columnas tab: "+COLUMNAS+ "columnas tab: "+NUMERO_GANADOR);
let tablero = new Tablero(ctx, width, height, FILAS, COLUMNAS,casillero);
let posX_Original,posY_Original;
let turno = 1;
let jugando = false;
// variables del reloj
let reloj = null;
const MiliSegundos = 1000;
let interval;
canvas.addEventListener("mousedown", onmousedown, false);
canvas.addEventListener("mousemove", onmousemove, false);
canvas.addEventListener("mouseup", onmouseup, false);

// Asigna las variables del modo de juego.
function configurar(){
  let select = elegirModo();
  FILAS = select[0];
  COLUMNAS = select[1];
  NUMERO_GANADOR = select[2];
 

}
//configura el modo elegido por los jugadores, 4 en línea, 5 en linea etc.
//Guarda los valores del select en un arreglo.
function elegirModo(){
  let modo = document.getElementById("modojuego").value;
  let tamanioTablero=[];
  let fila,columna,numeroGanador;
  if(modo == 4){
      fila = 6;
      tamanioTablero.push(fila);
      columna = 7;
      tamanioTablero.push(columna);
      numeroGanador = 4;
      tamanioTablero.push(numeroGanador);
  }
  else if(modo == 5){
    fila = 7;
    tamanioTablero.push(fila);
    columna = 8;
    tamanioTablero.push(columna);
    numeroGanador = 5;
    tamanioTablero.push(numeroGanador);
  }
  else if(modo == 6){
    fila = 8;
    tamanioTablero.push(fila);
    columna = 9;
    tamanioTablero.push(columna);
    numeroGanador = 6;
    tamanioTablero.push(numeroGanador);
  }
  else if(modo == 7){
    fila = 9;
    tamanioTablero.push(fila);
    columna = 10;
    tamanioTablero.push(columna);
    numeroGanador = 7;
    tamanioTablero.push(numeroGanador);
  }
 
  return tamanioTablero;
}

//Habilita el turno del jugador, resaltar la ficha seleccionada y desresaltar la que se dejó de seleccionar
function onmousedown(e) {
  
   isMouseDown = true;
   if (jugando == true){
    if (turno%2 !=0){
      habilitarFicha(jugador1);
     }else{
       habilitarFicha(jugador2);
     }
   }else{
     desHabilitarFichas();
   }
   
   if (lastClicFicha != null) {// se dejó de seleccionar una ficha
     lastClicFicha.setResaltado(false);
     lastClicFicha = null;
   }
   let fichaCliqueada = encontrarFicha(e.layerX, e.layerY); //e.layerX, e.layerY, son las posiciones x,y dentro del canvas

   if (fichaCliqueada != null && fichaCliqueada.getDisponible()) {
     posX_Original = fichaCliqueada.getPosX();
     posY_Original = fichaCliqueada.getPosY();
     fichaCliqueada.setResaltado(true);
     lastClicFicha = fichaCliqueada;
   }
   drawFichas();
 }
 
 //permite mover una ficha a otra posición según el mouse
 function onmousemove(e) {
    if(isMouseDown && lastClicFicha != null){
      lastClicFicha.setPosition(e.layerX,e.layerY);
      drawFichas();
    
    }
  }

  //Retorna la columna en la que tiró la ficha el jugador
  function columnaQueTiro(ficha){
  for(let i =0;i< COLUMNAS;i++){
  if((ficha.getPosX() > INICIO_TABLERO + i*TNO_FICHA) && ficha.getPosX() < INICIO_TABLERO + TNO_FICHA + i*TNO_FICHA){
 
    return i;
  }
}
  }
  //Baja la ficha hasta la posición correcta y verifica si hay un ganador
 function onmouseup(e) {
   isMouseDown = false;
   if(jugando == true){
   
    if (lastClicFicha != null && zonaJuego.inZonaJuego(lastClicFicha)) { 
         //si solte una ficha y estoy en la zona de juego, baja hasta ult. posicion vacia 
      let columnaATirar = columnaQueTiro(lastClicFicha);
    
       let ultimoCasillero = tablero.ultimoVacio(columnaATirar,lastClicFicha);  // devuelve el casillero donde ubicar la ficha
       
         if(ultimoCasillero == null){
          
           lastClicFicha.setPosition(posX_Original,posY_Original);
           drawFichas();
         }
         else {
               posUltimoCasillero = ultimoCasillero.getPosition();           
               lastClicFicha.setPosition(posUltimoCasillero.x+TNO_FICHA/2,posUltimoCasillero.y+TNO_FICHA/2);
               lastClicFicha.setDisponible(false);
               lastClicFicha.setResaltado(false);
               lastClicFicha.setUbicada(true);
               let index= tablero.index(ultimoCasillero);
               let ganador =verificarGanador(ultimoCasillero,index);
               if (ganador == "EMPATE"){
                swal('Termino el juego, empataron!!', ' ', 'success');
                finJuego(); 
               }else if( ganador!= null){
                 swal('Termino el juego, ganador '+ganador, ' ', 'success');
              
                finJuego(); 

              
               
               }   //devuelve el ganador
                   //stop y mostrar ganador
               turno++;
               
               drawFichas();
         }
       }
       else if(lastClicFicha != null){
         lastClicFicha.setPosition(posX_Original,posY_Original);
         drawFichas();
       }
   } 
 
 }
 //Deshabilita las opciones de juego ON, limpia el interval del time.
 function finJuego(){
  jugando = false;
  clearInterval(interval);
  desHabilitarFichas();
  desOcultarFichas();
 }
 //Muestra en DOM las opciones de fichas para cada jugador
function desOcultarFichas(){
  fichaYoda.style.visibility='visible';
  fichaR2d2.style.visibility='visible';
  fichaC3po.style.visibility='visible'; 
  fichaDarthy.style.visibility='visible';
  fichaBobaFet.style.visibility='visible';
  fichaStormTrooper.style.visibility='visible';
  btnIniciar.style.visibility='visible';
  fichasElegidasJugador1=false;
  fichasElegidasJugador2=false;
}
//Retorna la instancia de la ficha clickeada
function encontrarFicha(x, y) {
  for (let i = 0; i < fichas.length; i++) {
    const element = fichas[i];
    if (element.isPointInside(x, y)) {
      return element;
    }
  }
}


//Dibuja en Canva la zona de Juago (donde puede tirar el jugador)
function addZonaJuego(){
  zonaJuego.drawZonaJuego();
  
}
//Dibuja en Canva el tablero
function agregarTablero() {
  tablero.drawTablero();
}
//Toma las variables necesarias para CREAR las fichas, agrega las instancias de mismas en un arreglo y las dibuja en canva
function addFichas() {
 
  let fichasPorJugador = CANT_FICHAS/2;
  let posY = 50;
  let cant = 0;
  let cant2= 0;
  let posX = RADIUS + 5;
  for (let i = 1; i <= fichasPorJugador; i++) {
    
    if (i < fichasPorJugador / 3) {
      let y = i * posY;
      addFicha(posX, y , imgFicha1,jugador1);
      cant++;
    } else if (i >= fichasPorJugador / 3 && i < fichasPorJugador / 3*2){
      let y = (i-cant)*posY;
      posX = (RADIUS*3 + 10);
      addFicha(posX, y, imgFicha1,jugador1);
      cant2++;
    }else{
      posX = (RADIUS*5 +15);
      let y = (i-cant2-cant)*posY;
      addFicha(posX, y, imgFicha1,jugador1);
    }
    
  }
  cant=0;
  cant2 = 0;
  posX = width-(RADIUS+5);
  for (let i = 1; i <=fichasPorJugador; i++) {
    if (i < fichasPorJugador / 3) {
      let y = i * posY;
      addFicha(posX, y , imgFicha2,jugador2);
      cant++;
    } else if (i >= fichasPorJugador / 3 && i < fichasPorJugador / 3*2){
      let y = (i-cant)*posY;
      posX = width-(RADIUS*3 + 10);
      addFicha(posX, y, imgFicha2, jugador2);
      cant2++;
    }else{
      let y = (i-cant2-cant)*posY;
      posX= width-(RADIUS*5 +15);
      addFicha(posX, y, imgFicha2, jugador2);
    }
    
  
  }
  drawFichas();
}
// crea una nueva instancia de Ficha y la agrega al arreglo de fichas
function addFicha(posX, posY, imgFicha,jugador) {

  let ficha = new FichaRedonda(posX, posY, RADIUS,imgFicha, ctx,jugador);
  fichas.push(ficha); // agrego la nueva ficha  al arreglo de fichas
}
//Limpia en canva y dibuja las fichas en el mismo a partir del arreglo de fichas
function drawFichas() {
  clearCanvas();
  for (let i = 0; i < fichas.length; i++) {
    fichas[i].draw();
  }
  
}
//Limpia en canvas y agrega el tablero y la zona de juego
function clearCanvas(){
 ctx.clearRect(0,0,width,height);
  agregarTablero();
  addZonaJuego();
 
}
// crea el reloj y su intervalo de tiempo
function tiempoDeJuego(){
  
  if (interval != null){
    clearInterval(interval);
  }
  
  reloj = new Tiempo(5,document.getElementById("tiempo"));
  
  interval = setInterval(function(){
    reloj.calcularTiempo();   
  },MiliSegundos);
 
 
}
// reinicia el juego cargando nuevamente la url
function ReIniciarJuego(){
  window.location.reload();
}
//Prepara las configuraciones iniciales teniendo en cuenta diversos tableros y fichas
function iniciarJuego() {
  if( !fichasElegidasJugador1 || !fichasElegidasJugador2){
    swal('Ambos jugadores deben elegir una ficha ',' ', 'error');
  }
  else{
    btnIniciar.style.visibility='hidden';
    // ctx.clearRect(0,0,width,height);
     clearCanvas();
     tiempoDeJuego();
     turno=1;
     jugando = true;
     configurar();
     tablero = new Tablero(ctx, width, height, FILAS, COLUMNAS,casillero);
     ANCHO_TABLERO = COLUMNAS * TNO_FICHA;
     INICIO_TABLERO = width/2-(ANCHO_TABLERO/2);
     agregarTablero();
     zonaJuego = new ZonaJuego(ctx, width, height, COLUMNAS);
     addZonaJuego();
     
     CANT_FICHAS = FILAS*COLUMNAS;
     fichas = [];
     addFichas();
  }
 

}
// Habilita las fichas del jugador en turno y deshabilita las de su adversario
function habilitarFicha(jugador){
  for(let i =0;i<fichas.length;i++){
        if(fichas[i].getPerteneceA()==jugador){
          if(fichas[i].getUbicada() == false){
              fichas[i].setDisponible(true);
          }
        }else{
          fichas[i].setDisponible(false);
        }        
      }  
  }
//Deshabilita todas las fichas de ambos jugadores
  function desHabilitarFichas(){
   for(let i =0;i<fichas.length;i++){
       fichas[i].setDisponible(false);
    }   
  }

clearCanvas();
addFichas();

