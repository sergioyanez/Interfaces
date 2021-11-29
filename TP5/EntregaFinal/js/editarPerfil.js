'use strict'


let btnVolver = document.getElementById("volver");
btnVolver.addEventListener("click",volverAPerfil);

let btnEditar = document.getElementById("botonEditar");
btnEditar.addEventListener("click",volverAPerfil);

function volverAPerfil(){
    document.location.href ="perfil.html";
}


