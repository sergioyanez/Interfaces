'use strict'

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