'use strict'
let controldesplegable=true;
let controldesplegableChat=true;
let logo = document.getElementById("logo");
    logo.addEventListener("click",ir_a_Home);

let iconoHome = document.getElementById("iconoHome");
    iconoHome.addEventListener("click",ir_a_Home);

let iconoNoticias = document.getElementById("iconoNoticias");
    iconoNoticias.addEventListener("click",ir_a_Noticias);



let imagenPerfil = document.getElementById("imagenPerfil");
    imagenPerfil.addEventListener("click",mostrarDesplegable);

let NombrePerfil = document.getElementById("NombrePerfil");
    NombrePerfil.addEventListener("click",mostrarDesplegable);

let cuadroChats = document.getElementById("cuadroDeChats");

let menuDesplegable = document.getElementById("menuDesplegable");

let iconEditarPerfil = document.getElementById("iconEditar");
    iconEditarPerfil.addEventListener("click",ir_a_EditarPerfil);


let editar = document.getElementById("editar");
    editar.addEventListener("click",ir_a_EditarPerfil);


let iconSalir = document.getElementById("iconSalir");
    iconSalir.addEventListener("click",ir_a_Login);

let salir = document.getElementById("salir");
    salir.addEventListener("click",ir_a_Login);

let fotoChat = document.getElementById("amigo1");
    fotoChat.addEventListener("click", mostrarDesplegableDeChat);
let desplegableChat =document.getElementById("chatPersonal");

let cerrar = document.getElementById("cerrar");
cerrar.addEventListener("click",cerrarChatPersonal);
    

function ir_a_Home(){
        document.location.href ="home.html";
}

function ir_a_Noticias(){
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
    if(controldesplegable){
        menuDesplegable.classList.remove("oculto");
        menuDesplegable.classList.add("desocultar");
        controldesplegable=false;
    }
    else{
        menuDesplegable.classList.add("oculto");
        menuDesplegable.classList.remove("desocultar");
        controldesplegable=true;
    }
   
}

function mostrarDesplegableDeChat(){
    if(controldesplegableChat){
        
        desplegableChat.classList.remove("oculto");
        desplegableChat.classList.add("desocultar");
        controldesplegableChat=false;
    }
   
}

function cerrarChatPersonal(){
    desplegableChat.classList.add("oculto");
    desplegableChat.classList.remove("desocultar");
    controldesplegableChat=true;
}