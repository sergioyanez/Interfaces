
//Variables del Canvas

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

const CANT_FIG = 21;
const RADIUS = 35;

//Variables del Tablero.
const FILAS = 6; //Para agrandar el tablero y que se agreguen mas fichas esto puede hacerse dinamico
const COLUMNAS = 7; //Por ej: que elija el valor de un select
const CANT_FICHAS = FILAS * COLUMNAS;
const TNO_FICHA = 84;
const MARGEN_TABLERO = 100;
const ANCHO_TABLERO = COLUMNAS * TNO_FICHA;
const ALTO_TABLERO = FILAS * TNO_FICHA;
const INICIO_TABLERO = width/4;
const FRONTERA = 10;   //líneas de la zona de lanzamiento
const NUMERO_GANADOR = 4; //SE INGRESA POR INPUT 4, 5 o 6

let fichas = []; //tengo arreglo de fichas
let imgFicha1 = document.getElementById("imgP1");
let imgFicha2 = document.getElementById("imgP2");
let casillero = document.getElementById("casillero");
let lastClicFicha = null;
let isMouseDown = false;
let jugador1="Tito";  //tomarlo de Input
let jugador2= "Elvy";
let fichasJugadores = 0;
let zonaJuego = new ZonaJuego(ctx, width, height, COLUMNAS);
let tablero = new Tablero(ctx, width, height, FILAS, COLUMNAS,casillero);
let posX_Original,posY_Original;
let turno = 1;
canvas.addEventListener("mousedown", onmousedown, false);
canvas.addEventListener("mousemove", onmousemove, false);
canvas.addEventListener("mouseup", onmouseup, false);




function onmousedown(e) {
  //   console.log(e);
   isMouseDown = true;
   if (turno%2 !=0){
    habilitarFicha(jugador1);
   }else{
     habilitarFicha(jugador2);
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
  //  console.log(INICIO_TABLERO,ficha.getPosX(),INICIO_TABLERO + TNO_FICHA);
for(let i =0;i< COLUMNAS;i++){
  if((ficha.getPosX() > INICIO_TABLERO + i*TNO_FICHA) && ficha.getPosX() < INICIO_TABLERO + TNO_FICHA + i*TNO_FICHA){
 //   alert("la columna es: "+ i);
    return i;
  }
}
  }
  //ACA MODIFIQUE
 function onmouseup(e) {
   isMouseDown = false;
 /*  if (turno%2 ==0){
    habilitarFicha(jugador1);
   }else{
     habilitarFicha(jugador2);
   }*/
   
   if (lastClicFicha != null && zonaJuego.inZonaJuego(lastClicFicha)) { 
   //  alert( "entra la if de  mouse up");   //si solte una ficha y estoy en la zona de juego, baja hasta ult. posicion vacia 
   let columnaATirar = columnaQueTiro(lastClicFicha);
  // alert("columna a tirar: "+columnaATirar);
    let posUltimoCasillero = tablero.ultimoVacio(columnaATirar);  // devuelve la pos en x e y
  //  let posY =  lastClicFicha.getPosY();
 //   let posX = lastClicFicha.getPosX();
   // lastClicFicha.setPosition(posX,ultimo*TNO_FICHA-30);
   console.log(posUltimoCasillero);
      if(posUltimoCasillero == null){
        lastClicFicha.setPosition(posX_Original,posY_Original);
        drawFichas();
      }
      else {
            lastClicFicha.setPosition(posUltimoCasillero.x+TNO_FICHA/2,posUltimoCasillero.y+TNO_FICHA/2);
            lastClicFicha.setDisponible(false);
            lastClicFicha.setResaltado(false);
            lastClicFicha.setUbicada(true);
            turno++;
            
            drawFichas();
      }
    }
    else if(lastClicFicha != null){
      lastClicFicha.setPosition(posX_Original,posY_Original);
      drawFichas();
    }
    if(juegoTerminado(lastClicFicha))
    drawFichas();
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
 // let zonaJuego = new ZonaJuego(ctx, width, height, COLUMNAS);
  zonaJuego.drawZonaJuego();
  
}

function agregarTablero() {
 // let tablero = new Tablero(ctx, width, height, FILAS, COLUMNAS,casillero);
  tablero.drawTablero();
}

function addFichas() {
  //paso como parámetro la imagen y la posición? o paso el jugador???
  for (let i = 1; i <= CANT_FIG; i++) {
    if (i < CANT_FIG / 2) {
      addFicha(width / 4 - 200, i * 50 , imgFicha1,jugador1);
    } else addFicha(width / 4 - 100, i * 50-500, imgFicha1,jugador1);
  }
  for (let i = 1; i <=CANT_FIG; i++) {
    if (i < CANT_FIG / 2) {
      addFicha(3 * (width / 4)+ 50, i * 50 , imgFicha2,jugador2);
    } else addFicha(3 * (width / 4) + 150, i * 50 - 500, imgFicha2, jugador2);
  }
  drawFichas();
}

function addFicha(posX, posY, imgFicha,jugador) {
//  console.log("posiciones x , y ",posX,posY);
  let ficha = new FichaRedonda(posX, posY, RADIUS,imgFicha, ctx,jugador);
 // console.log("en ficha"+ficha.getPerteneceA());
 // console.log("en parametro"+jugador);+
 
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
 // console.log("limpia");
  ctx.clearRect(0,0,width,height);
  agregarTablero();
  addZonaJuego();

}
function iniciarJuego() {
  // HACER UN BOTON REINICIAR JUEGO
  agregarTablero();
  addFichas();
  addZonaJuego();
 // jugar();
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
iniciarJuego();




function juegoTerminado(lastClicFicha) {
  if (
      ganadorPorFila(lastClicFicha) ||
      ganadorPorColumna(lastClicFicha) ||
      ganadorPorDiagonal(lastClicFicha)
  ) {
      return true;
  }
  if (esEmpate()) {
      alert("Juego Empatado!");
      return true;
  }
  return false;
}


function esEmpate() {
  if (fichasJugadores == CANT_FICHAS) {
      return true;
  }
}


function ganadorPorColumna(lastClicFicha) {
  let x = lastClicFicha.getPosX();
  let y = lastClicFicha.getPosY();
  let jugador = lastClicFicha.getPerteneceA();
  let ganador = false;

  if (recuCol(x, y, player, lastClicFicha, ganador) >= NUMERO_GANADOR) {
    ganador = true;
      let aux = recuCol(x, y, jugador, lastClicFicha, ganador);
      return true;
  }
}

function ganadorPorFila(lastClicFicha) {
  let x = lastClicFicha.getPosX() - TNO_FICHA / 2; //posX de la celda que contiene la ultima ficha insertada
  let y = lastClicFicha.getPosY() - TNO_FICHA / 2; //posY de la celda que contiene la ultima ficha insertada
  let jugador = lastClicFicha.getPerteneceA();
  let ganador = false;
console.log(x,y,jugador,ganador);
  let contFilaIzquierda = recuFilaIzq(x, y, jugador, lastClicFicha, ganador);
  let contFilaDerecha = recuFilaDer(x, y, jugador, lastClicFicha, ganador);

  if ((contFilaIzquierda + contFilaDerecha - 1) >= NUMERO_GANADOR) {
      ganador = true;
      leftRowCount = recuFilaIzq(x, y, jugador, lastClicFicha, ganador);
      rightRowCount = recuFilaDer(x, y, jugador, lastClicFicha, ganador);
      return true;
  }
}

function ganadorPorDiagonal(lastClicFicha) {
  let x = lastClicFicha.getPosX() - TNO_FICHA / 2; //posX de la celda que contiene la ultima ficha insertada
  let y = lastClicFicha.getPosY() - TNO_FICHA / 2; //posY de la celda que contiene la ultima ficha insertada
  let jugador = lastClicFicha.getPerteneceA();
  let ganador = false;

  let diagIzqArriba = recuDiagLeftUp(x, y, jugador, lastClicFicha, ganador);
  let diagDerAbajo = recuDiagRightDown(x, y, jugador, lastClicFicha, ganador);

  let diagDerArriba = recuDiagRightUp(x, y, jugador, lastClicFicha, ganador);
  let diagIzqAbajo = recuDiagLeftDown(x, y, jugador, lastClicFicha, ganador);

  if ((diagIzqArriba + diagDerAbajo - 1) >= NUMERO_GANADOR) {
    ganador = true;
    diagIzqArriba = recuDiagIzqArriba(x, y, jugador, lastClicFicha, ganador);
    diagDerAbajo = recuDiagDerAbajo(x, y, jugador, lastClicFicha, ganador);
      return true;
  }

  if ((diagDerArriba + diagIzqAbajo - 1) >= NUMERO_GANADOR) {
    ganador = true;
    diagDerArriba = recuDiagDerArriba(x, y, jugador, lastClicFicha, ganador);
    diagIzqAbajo = recuDiagIzqAbajo(x, y, jugador, lastClicFicha, ganador);
      return true;
  }
}

//Esta funcion me devuelve el "id" de una figura en (x,y)
function getFichaPorCoord(x, y) {
  for (let i = 0; i < fichas.length; i++) {
      if (fichas[i].getPosX() == x && fichas[i].getPosY() == y) {
          return i;
      }
  }
  return null;
}




//#region funciones recursivas de los 7 posibles casos ganadores
function recuCol(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  if (y < ALTO_TABLERO) {
      let indexCell = getFichaPorCoord(x, y);
      //checkeo si es el mismo jug
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFigureByCoord(x, y);
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();
          }
          return recuCol(x, y + TNO_FICHA, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}

function recuFilaIzq(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  if (x > ALTO_TABLERO) {
      //checkeo si es el mismo jug
      let indexCell = getFichaPorCoord(x, y);
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFichaPorCoord(x + (TNO_FICHA / 2), y + (TNO_FICHA / 2));
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();
          }
          return recuFilaIzq(x - TNO_FICHA, y, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}

function recuFilaDer(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  console.log(x,y,jugador,ganador);
  if (x <= ANCHO_TABLERO + (TNO_FICHA * COLUMNAS)) {
      //checkeo si es el mismo jug
      let indexCell = getFichaPorCoord(x, y);
      console.log(indexCell);
      console.log(fichas);
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFichaPorCoord(x + (TNO_FICHA / 2), y + (TNO_FICHA / 2));
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();
          }
          return recuFilaDer(x + TNO_FICHA, y, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}


function recuDiagDerArriba(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  if ((y >= height - (FILAS * TNO_FICHA)) && (x <= (width + (COLUMNAS * TNO_FICHA)))) {
      //checkeo si es el mismo jug
      let indexCell = getFichaPorCoord(x, y);
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFichaPorCoord(x + (TNO_FICHA / 2), y + (TNO_FICHA / 2));
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();;
          }
          return recuDiagDerArriba(x + TNO_FICHA, y - TNO_FICHA, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}

function recuDiagDerAbajo(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  if ((y < height) && (x <= (width + (COLUMNAS * TNO_FICHA)))) {
      //checkeo si es el mismo jug
      let indexCell = getFichaPorCoord(x, y);
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFichaPorCoord(x + (TNO_FICHA / 2), y + (TNO_FICHA / 2));
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();
          }
          return recuDiagDerAbajo(x + TNO_FICHA, y + TNO_FICHA, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}

function recuDiagIzqAbajo(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  if ((y < height) && (x > width)) {
      //checkeo si es el mismo jug
      let indexCell = getFichaPorCoord(x, y);
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFichaPorCoord(x + (TNO_FICHA / 2), y + (TNO_FICHA / 2));
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();
          }
          return recuDiagIzqAbajo(x - TNO_FICHA, y + TNO_FICHA, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}

function recuDiagIzqArriba(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  if ((y >= height - (COLUMNAS * TNO_FICHA) && (x > width))) {
      //checkeo si es el mismo jug
      let indexCell = getFichaPorCoord(x, y);
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFichaPorCoord(x + (TNO_FICHA / 2), y + (TNO_FICHA / 2));
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();
          }
          return recuDiagIzqArriba(x - TNO_FICHA, y - TNO_FICHA, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}

//#endregion
