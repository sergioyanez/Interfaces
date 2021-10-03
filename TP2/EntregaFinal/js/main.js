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
        if(i < CANT_FIG/2){
            addFicha1((width/4)-200, i*30+150 );
        }else
            addFicha1((width/4)-100, i*30-150 );
             //mover la posición y    
    } 
    for (let i = 1; i<CANT_FIG; i++ ){
        if(i < CANT_FIG/2){
            addFicha2(3*(width/4), i*30+150 );
        }else
            addFicha2(3*(width/4)+100, i*30-150 );
         //mover la posición y    
    } 
}

function addFicha1(posX,posY){
   let imgFicha = document.getElementById("imgP1");       
   let ficha = new FichaRedonda(posX,posY,RADIUS,imgFicha,ctx);   
   ficha.draw();
}

function addFicha2(posX,posY){
   let imgFicha = document.getElementById("imgP2");       
   let ficha = new FichaRedonda(posX,posY,RADIUS,imgFicha,ctx);   
   ficha.draw();
}    
addFichas();



