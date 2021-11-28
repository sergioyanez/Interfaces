'use strict'

let btnIniciarSesion = document.getElementById("btnIniciar");
    btnIniciarSesion.addEventListener("click",iniciarSesion);

function iniciarSesion(){
    document.location.href ="home.html";
}



let btnCrearCuenta = document.getElementById("registrar");
    btnCrearCuenta.addEventListener("click",crearCuenta);

function crearCuenta(){
    document.location.href ="registro.html";
}

