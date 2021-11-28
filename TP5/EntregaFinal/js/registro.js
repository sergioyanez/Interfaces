'use strict'

let btnRegistrar = document.getElementById("registrarCta");
    btnRegistrar.addEventListener("click",registrarCuenta);

function registrarCuenta(){
    document.location.href ="login.html";
}



let btnVolver = document.getElementById("volver");
    btnVolver.addEventListener("click",volver);

function volver(){
    document.location.href ="login.html";
}