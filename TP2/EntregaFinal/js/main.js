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
let lastClicFicha = null;
let isMouseDown = false;

//Variables del Tablero.
const FILAS = 6; //Para agrandar el tablero y que se agreguen mas fichas esto puede hacerse dinamico
const COLUMNAS = 7; //Por ej: que elija el valor de un select
const CANT_FICHAS = FILAS * COLUMNAS;



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
}

function agregarTablero() {
  let tablero = new Tablero(ctx, width, height, FILAS, COLUMNAS);
  tablero.drawTablero();
}

function addFichas() {
  //paso como parámetro la imagen y la posición? o paso el jugador???
  for (let i = 1; i <= CANT_FIG; i++) {
    if (i < CANT_FIG / 2) {
      addFicha(width / 4 - 200, i * 50 , imgFicha1);
    } else addFicha(width / 4 - 100, i * 50-500, imgFicha1);
  }
  for (let i = 1; i <=CANT_FIG; i++) {
    if (i < CANT_FIG / 2) {
      addFicha(3 * (width / 4)+ 50, i * 50 , imgFicha2);
    } else addFicha(3 * (width / 4) + 150, i * 50 - 500, imgFicha2);
  }
  drawFichas();
}

function addFicha(posX, posY, imgFicha) {
//  console.log("posiciones x , y ",posX,posY);
  let ficha = new FichaRedonda(posX, posY, RADIUS, imgFicha, ctx);
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
