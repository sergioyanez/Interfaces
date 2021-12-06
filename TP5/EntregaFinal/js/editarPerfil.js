'use strict'


let btnVolver = document.getElementById("volver");
btnVolver.addEventListener("click",volverAPerfil);
let loader=document.getElementById("loader2");


let btnEditar = document.getElementById("botonEditar");
btnEditar.addEventListener("click",realizarLoading);

function volverAPerfil(){
    document.location.href ="perfil.html";
}

function realizarLoading(){
loader.classList.remove("oculto");
// loader.classList.add("loading");
 setTimeout(volverAPerfil,1500);
}


