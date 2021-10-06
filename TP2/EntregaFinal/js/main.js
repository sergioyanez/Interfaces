"use strict";
//Variables del Canvas

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

const CANT_FIG = 21;
const RADIUS = 25;

let fichas = []; //tengo arreglo de fichas
let imgFicha1 = document.getElementById("imgP1");
let imgFicha2 = document.getElementById("imgP2");
let casillero = document.getElementById("casillero");
let lastClicFicha = null;
let isMouseDown = false;
let jugador1="Tito";  //tomarlo de Input
let jugador2= "Elvy";

canvas.addEventListener("mousedown", onmousedown, false);
canvas.addEventListener("mousemove", onmousemove, false);
canvas.addEventListener("mouseup", onmouseup, false);

//Variables del Tablero.
const FILAS = 6; //Para agrandar el tablero y que se agreguen mas fichas esto puede hacerse dinamico
const COLUMNAS = 7; //Por ej: que elija el valor de un select
const CANT_FICHAS = FILAS * COLUMNAS;


function onmousedown(e) {
  //   console.log(e);
   isMouseDown = true;
   if (lastClicFicha != null) {// se dejó de seleccionar una ficha
     lastClicFicha.setResaltado(false);
     lastClicFicha = null;
   }
   let fichaCliqueada = encontrarFicha(e.layerX, e.layerY); //e.layerX, e.layerY, son las posiciones x,y dentro del canvas
  // console.log("posiciones del evento",e.layerX, e.layerY);
   if (fichaCliqueada != null) {
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

 function onmouseup(e) {
   isMouseDown = false;
 }


function encontrarFicha(x, y) {// busca (en el arreglo fichas) la ficha cliqueada
  for (let i = 0; i < fichas.length; i++) {
    const element = fichas[i];
    if (element.isPointInside(x, y)) {
      return element;
    }
  }
}

function iniciarJuego() {
  // HACER UN BOTON REINICIAR JUEGO
  agregarTablero();
  addFichas();
  addZonaJuego();
}

function addZonaJuego(){
  let zonaJuego = new ZonaJuego(ctx, width, height, COLUMNAS);
  zonaJuego.drawZonaJuego();
}

function agregarTablero() {
  let tablero = new Tablero(ctx, width, height, FILAS, COLUMNAS,casillero);
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

function addFicha(posX, posY, imgFicha, jugador) {
//  console.log("posiciones x , y ",posX,posY);
  let ficha = new FichaRedonda(posX, posY, RADIUS, imgFicha, ctx, jugador);
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
  console.log("limpia");
  ctx.clearRect(0,0,width,height);
  agregarTablero();
}

iniciarJuego();
