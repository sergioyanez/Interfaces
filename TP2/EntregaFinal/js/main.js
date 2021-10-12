
//Variables del Canvas

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let btnIniciar = document.getElementById("btnIniciar");
    btnIniciar.addEventListener("click",iniciarJuego);

//const CANT_FIG = 21;
const RADIUS = 35;

//Variables del Tablero.
var FILAS = 6;
var COLUMNAS =7; //Por ej: que elija el valor de un select
var NUMERO_GANADOR = 4; //SE INGRESA POR INPUT 4, 5 o 6

let CANT_FICHAS = FILAS * COLUMNAS;
const TNO_FICHA = 84;
const MARGEN_TABLERO = 80;

let ANCHO_TABLERO = COLUMNAS * TNO_FICHA;
//let ALTO_TABLERO = FILAS * TNO_FICHA;
let INICIO_TABLERO = width/2-(ANCHO_TABLERO/2);
const FRONTERA = 10;   //líneas de la zona de lanzamiento


let fichas = []; //tengo arreglo de fichas
let imgFicha1 = document.getElementById("imgP1");
let imgFicha2 = document.getElementById("imgP2");
let casillero = document.getElementById("casillero");
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
let jugando = true;
// variables del reloj
let reloj = null;
const MiliSegundos = 1000;
let interval;
canvas.addEventListener("mousedown", onmousedown, false);
canvas.addEventListener("mousemove", onmousemove, false);
canvas.addEventListener("mouseup", onmouseup, false);


function configurar(){
  let select = elegirModo();
  FILAS = select[0];
  COLUMNAS = select[1];
  NUMERO_GANADOR = select[2];
 
  

}

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


function onmousedown(e) {
  //   console.log(e);
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
 
 function onmousemove(e) {
    if(isMouseDown && lastClicFicha != null){
      lastClicFicha.setPosition(e.layerX,e.layerY);
      drawFichas();
    //  console.log(fichaCliqueada.getPosition());
    }
  }

  function columnaQueTiro(ficha){
  for(let i =0;i< COLUMNAS;i++){
  if((ficha.getPosX() > INICIO_TABLERO + i*TNO_FICHA) && ficha.getPosX() < INICIO_TABLERO + TNO_FICHA + i*TNO_FICHA){
 
    return i;
  }
}
  }
  //ACA MODIFIQUE
 function onmouseup(e) {
   isMouseDown = false;
   if(jugando == true){
   
    if (lastClicFicha != null && zonaJuego.inZonaJuego(lastClicFicha)) { 
      //  alert( "entra la if de  mouse up");   //si solte una ficha y estoy en la zona de juego, baja hasta ult. posicion vacia 
      let columnaATirar = columnaQueTiro(lastClicFicha);
     // alert("columna a tirar: "+columnaATirar);
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
               }else if( ganador!= null){
                 swal('Termino el juego, ganador '+ganador, ' ', 'success');
              //   alert("Ganador: "+ganador);
                finJuego(); 

              //   window.location.reload();
               
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
 function finJuego(){
  jugando = false;
  clearInterval(interval);
  desHabilitarFichas();
 }


function encontrarFicha(x, y) {// busca (en el arreglo fichas) la ficha cliqueada
  for (let i = 0; i < fichas.length; i++) {
    const element = fichas[i];
    if (element.isPointInside(x, y)) {
      return element;
    }
  }
}



function addZonaJuego(){
  zonaJuego.drawZonaJuego();
  
}

function agregarTablero() {
  tablero.drawTablero();
}

function addFichas() {
 
  //paso como parámetro la imagen y la posición? o paso el jugador???
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

function addFicha(posX, posY, imgFicha,jugador) {

  let ficha = new FichaRedonda(posX, posY, RADIUS,imgFicha, ctx,jugador);
 
 
  fichas.push(ficha); // agrego la nueva ficha  al arreglo de fichas
}

function drawFichas() {
  clearCanvas();
  // dibuja las fichas a partir del arreglo fichas
  for (let i = 0; i < fichas.length; i++) {
    fichas[i].draw();
  }
  
}
function clearCanvas(){
 ctx.clearRect(0,0,width,height);
  agregarTablero();
  addZonaJuego();
  

}

function tiempoDeJuego(){
  
  if (interval != null){
    clearInterval(interval);
  }
  
  reloj = new Tiempo(5,document.getElementById("tiempo"));
  
  interval = setInterval(function(){
    reloj.calcularTiempo();   
  },MiliSegundos);
 
 
}

function iniciarJuego() {
 
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

  function desHabilitarFichas(){
    for(let i =0;i<fichas.length;i++){
       fichas[i].setDisponible(false);
    }   
  }
//iniciarJuego();
clearCanvas();
addFichas();
desHabilitarFichas();

