'use strict'

let control=true;
let controldesplegable=true;
let controldesplegableChat=true;
let controlBusqueda=true;
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
    
// let editarDatos=document.getElementById("btnEditar");

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

let videoLlamada= document.getElementById("videoLlamada");
videoLlamada.addEventListener("click", iniciarVideoLlamada);

let pantallaVideo=document.getElementById("pantallaVideo");

let colgar = document.getElementById("colgar");
colgar.addEventListener("click",cortarVideoLlamada);

let salirChats=document.getElementById("salirChats");
salirChats.addEventListener("click", cerrarVentanaChats);

let iconoChat = document.getElementById("iconoChat");
    iconoChat.addEventListener("click",ir_a_Chats);

let chatDesplegable = document.getElementById("cuadroDeChats");

let cuadroBusqueda=document.getElementById("busquedaAvanzada");
    cuadroBusqueda.addEventListener("click",abrirCuadroDeBusqueda);

let busquedas=document.getElementById("cuadroDeBusquedas");

let btnBuscarAvanzado=document.getElementById("btnBuscarAvanzado");
    btnBuscarAvanzado.addEventListener("click",desocultaBusquedas);

let hoverBus=document.getElementById("hoverBus");
    
let btnCerrarBusquedas=document.getElementById("btnCerrarAvanzado");
    btnCerrarBusquedas.addEventListener("click", ocultaBusquedas);


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
        cerrarChatPersonal();
        cortarVideoLlamada();
        cerrarVentanaChats();
        cerrarCuadroDeBusqueda();      
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
        cerrarDesplegable();
        cortarVideoLlamada();
        
    }   
}

function cerrarDesplegableChats(){
    desplegableChat.classList.add("oculto");
    desplegableChat.classList.remove("desocultar");
    controldesplegableChat=true;
}

function cerrarDesplegable(){
    menuDesplegable.classList.add("oculto");
    menuDesplegable.classList.remove("desocultar");
    controldesplegable=true;
}

function cerrarChatPersonal(){
    desplegableChat.classList.add("oculto");
    desplegableChat.classList.remove("desocultar");
    controldesplegableChat=true;
}

function iniciarVideoLlamada(){
    pantallaVideo.classList.remove("oculto");
    pantallaVideo.classList.add("desocultar");
    cerrarDesplegable();
    cerrarChatPersonal();
    cerrarVentanaChats();
    cerrarDesplegableChat();
}

function cortarVideoLlamada(){
    pantallaVideo.classList.add("oculto");
    pantallaVideo.classList.remove("desocultar");
}

function cerrarVentanaChats(){  
    cuadroChats.classList.add("oculto");
    cuadroChats.classList.remove("desocultar");
}



function ir_a_Chats(){
    if(control){
        chatDesplegable.classList.remove("oculto");
        chatDesplegable.classList.add("desocultar");
        control=false;
        cerrarDesplegable();
        cerrarChatPersonal();
        cerrarCuadroDeBusqueda();        
    }
    else{
        chatDesplegable.classList.add("oculto");
        chatDesplegable.classList.remove("desocultar");
        control=true;
    }
   
}


function abrirCuadroDeBusqueda(){
    if(controlBusqueda){
        busquedas.classList.remove("oculto");
        busquedas.classList.add("desocultar");
        controlBusqueda=false;
        cerrarDesplegableChats();
        cerrarDesplegable();
        cerrarVentanaChats();
        if(hoverBus.classList.contains("desocultar")){
            ocultaBusquedas()();
        }
    }
    else{
        busquedas.classList.add("oculto");
        busquedas.classList.remove("desocultar");
        controlBusqueda=true;
        ocultaBusquedas();
    }
}     


function cerrarCuadroDeBusqueda(){
     busquedas.classList.add("oculto");
    busquedas.classList.remove("desocultar");
    controlBusqueda=true;
    ocultaBusquedas();
}

function desocultaBusquedas(){
    hoverBus.classList.remove("oculto");
    hoverBus.classList.add("desocultar");
}


function ocultaBusquedas(){
    hoverBus.classList.remove("desocultar");
    hoverBus.classList.add("oculto");
   
}