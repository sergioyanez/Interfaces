"use strict";
//Variables del Canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;



//Variables del Tablero.
const FILAS = 6;//Para agrandar el tablero y que se agreguen mas fichas esto puede hacerse dinamico
const COLUMNAS = 7;//Por ej: que elija el valor de un select
const CANT_FICHAS = FILAS*COLUMNAS;


function agregarTablero(){
    let tablero = new Tablero(ctx, width, height, FILAS, COLUMNAS);
    tablero.drawTablero();
}

agregarTablero();


//var img = document.getElementById("scream");
