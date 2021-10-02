"use strict";
//Variables del Canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
const CANT_FIG = 21;
const RADIUS = 40;

let fichas = [];            //tengo arreglo de fichas
let lastClicFicha = null;
let isMouseDown = false;
// this.imgFicha1 = new Image();
// this.imgFicha1.src = "images/joda.png";




//Variables del Tablero.
const FILAS = 6;//Para agrandar el tablero y que se agreguen mas fichas esto puede hacerse dinamico
const COLUMNAS = 7;//Por ej: que elija el valor de un select
const CANT_FICHAS = FILAS*COLUMNAS;


function agregarTablero(){
    let tablero = new Tablero(ctx, width, height, FILAS, COLUMNAS);
    tablero.drawTablero();
}

agregarTablero();


function addFichas(){   //paso como parámetro la imagen y la posición? o paso el jugador???
     for (let i = 1; i<CANT_FIG; i++ ){
             addFicha((width/4)-100, i*30 );
              //mover la posición y
  //  for (let i = 1; i<CANT_FIG; i++ ){
     //       addFichas(img2,pos2);
            //mover la posición y

         //}
    }
}

function addFicha(posX,posY){
    let imgFicha1 = document.getElementById("imgP2");
       
    let ficha = new FichaRedonda(posX,posY,RADIUS,imgFicha1,ctx);
   
    ficha.draw();
}
    
addFichas();



