'use strict'

let logo = document.getElementById("logo");
    logo.addEventListener("click",ir_a_Home);

let iconoHome = document.getElementById("iconoHome");
    iconoHome.addEventListener("click",ir_a_Home);

let iconoNoticias = document.getElementById("iconoNoticias");
iconoNoticias.addEventListener("click",ir_a_Noticias);

let iconoChat = document.getElementById("iconoChat");
    iconoChat.addEventListener("click",ir_a_Chats);

let imagenPerfil = document.getElementById("imagenPerfil");
imagenPerfil.addEventListener("click",mostrarDesplegable);

let NombrePerfil = document.getElementById("NombrePerfil");
NombrePerfil.addEventListener("click",mostrarDesplegable);

let menuDesplegable = document.getElementById("menuDesplegable");

let iconEditarPerfil = document.getElementById("iconEditar");
    iconEditarPerfil.addEventListener("click",ir_a_EditarPerfil);

let editarPerfil = document.getElementById("editar");
    editarPerfil.addEventListener("click",ir_a_EditarPerfil);

let editar = document.getElementById("editar");
    editar.addEventListener("click",ir_a_EditarPerfil);


let iconSalir = document.getElementById("iconSalir");
    iconSalir.addEventListener("click",ir_a_Login);

let salir = document.getElementById("salir");
    salir.addEventListener("click",ir_a_Login);
    

function ir_a_Home(){
        document.location.href ="home.html";
}

function ir_a_Noticias(){
    document.location.href ="noticias.html";
}

function ir_a_Chats(){
    document.location.href ="noticias.html";
}

function ir_a_EditarPerfil(){
    menuDesplegable.classList.add("oculto")
    menuDesplegable.classList.remove("desocultar")
    document.location.href ="perfil.html";
}

function ir_a_Login(){
    menuDesplegable.classList.add("oculto")
    menuDesplegable.classList.remove("desocultar")
    document.location.href ="login.html";
}

function mostrarDesplegable(){
    menuDesplegable.classList.remove("oculto")
    menuDesplegable.classList.add("desocultar")
}