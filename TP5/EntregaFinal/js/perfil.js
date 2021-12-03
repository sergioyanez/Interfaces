'use strict'

let btnIniciarSesion = document.getElementById("btnEditar");
    btnIniciarSesion.addEventListener("click",iniciarSesion);

function iniciarSesion(){
    document.location.href ="editarPerfil.html";
}


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

function iniciarVideoLlamada(){
    pantallaVideo.classList.remove("oculto");
    pantallaVideo.classList.add("desocultar");
}

function cortarVideoLlamada(){
    pantallaVideo.classList.add("oculto");
    pantallaVideo.classList.remove("desocultar");
}

function cerrarVentanaChats(){  
    cuadroChats.classList.add("oculto");
    cuadroChats.classList.remove("desocultar");
}

let control=true;
let iconoChat = document.getElementById("iconoChat");
    iconoChat.addEventListener("click",ir_a_Chats);
let chatDesplegable = document.getElementById("cuadroDeChats");

function ir_a_Chats(){
    if(control){
        chatDesplegable.classList.remove("oculto");
        chatDesplegable.classList.add("desocultar");
        control=false;
    }
    else{
        chatDesplegable.classList.add("oculto");
        chatDesplegable.classList.remove("desocultar");
        control=true;
    }
   
}
let controlBusqueda=true;
let busquedas=document.getElementById("cuadroDeBusquedas")
let cuadroBusqueda=document.getElementById("busquedaAvanzada");
    cuadroBusqueda.addEventListener("click",abrirCuadroDeBusqueda);

function abrirCuadroDeBusqueda(){
    if(controlBusqueda){
        busquedas.classList.remove("oculto");
        busquedas.classList.add("desocultar");
        controlBusqueda=false;
        if(hoverBus.classList.contains("desocultar")){
            hoverBus.classList.add("oculto");
            hoverBus.classList.remove("desocultar");
        }
    }
    else{
        busquedas.classList.add("oculto");
        busquedas.classList.remove("desocultar");
        controlBusqueda=true;
        cerrarBusquedas();
    }
       
    
}

let btnBuscarAvanzado=document.getElementById("btnBuscarAvanzado");
btnBuscarAvanzado.addEventListener("click",desocultaBusqueda);
let hoverBus=document.getElementById("hoverBus");

function desocultaBusqueda(){
hoverBus.classList.remove("oculto");
hoverBus.classList.add("desocultar");
}

let btnCerrarBusquedas=document.getElementById("btnCerrarAvanzado");
btnCerrarBusquedas.addEventListener("click", cerrarBusquedas);

function cerrarBusquedas(){
    hoverBus.classList.remove("desocultar");
    hoverBus.classList.add("oculto");
   
}




