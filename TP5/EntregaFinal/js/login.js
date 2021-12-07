'use strict'



function iniciarSesion(){
    realizarLoading();
    // document.location.href ="home.html";
}



let btnCrearCuenta = document.getElementById("registrar");
    btnCrearCuenta.addEventListener("click",crearCuenta);

function crearCuenta(){
    document.location.href ="registro.html";
}

const logoCompleto = document.getElementById('logoCompleto');
  

function move(x, y) {
  let dx = (x - window.innerWidth) / window.innerWidth * 10,
      dy = (y - window.innerHeight) / window.innerHeight * 10;
      logoCompleto.style.left = `${dx}vmin`;
      logoCompleto.style.top = `${dy}vmin`;
  dx += 5;
  dy += 5 + 10; 
}

document.addEventListener('mousemove', (e) => {
  move(e.pageX, e.pageY);
});
document.addEventListener('touchmove', (e) => {
  move(e.touches[0].pageX, e.touches[0].pageY);
});


/*------------------------------------------------------
----------------------------------------------------------

--------------------------------------------------------*/

 
 document.getElementById("btnIniciar").addEventListener("click", ()=>{
  //Creo booleanos para saber si la contraseña y usuario son correctos
  let isContraseña = false;
  let isUserName = false;
  //Obtengo los inputs y mensajes de error
  let userName = document.getElementById("rectangulo6");
  let contraseña = document.getElementById("rectangulo6_bis");
  let mensajeError1 = document.getElementById("error1");
  let mensajeError2 = document.getElementById("error2");
  
  //Chequeo si el usuario es valido
  if(userName.value == "sergio" || userName.value == "elva"){
      //Usuario valido, modifico las clases y seteo el booleano en true
      userName.classList.remove("error");
      mensajeError1.classList.remove("mensajeInput");
      mensajeError1.classList.add("mensajeInputOculto");
      isUserName = true;
  } else if (userName.value.length == 0) {
      //Usuario invalido, modifico las clases y creo el mensaje de error
      userName.classList.add("error");
      mensajeError1.classList.remove("mensajeInputOculto");
      mensajeError1.classList.add("mensajeInput");
      mensajeError1.innerHTML = "* Campo vacío. Por favor completelo";
  } else {
      //Usuario invalido, modifico las clases y creo el mensaje de error
      userName.classList.add("error");
      mensajeError1.classList.remove("mensajeInputOculto");
      mensajeError1.classList.add("mensajeInput");
      mensajeError1.innerHTML = "* E-mail o usuario invalido. Por favor ingrese otro";
  }
  //Chequeo si la contraseña es valida
  if(contraseña.value == "123" || contraseña.value == "456"){
      //Contraseña valida, modifico las clases y seteo el booleano en true
      contraseña.classList.remove("error");
      mensajeError2.classList.add("mensajeInputOculto");
      mensajeError2.classList.remove("mensajeInput");
      isContraseña = true;
  } else if (contraseña.value.length == 0) {
      //Contraseña invalida, modifico las clases y creo un mensaje de error
      contraseña.classList.add("error");
      mensajeError2.classList.remove("mensajeInputOculto");
      mensajeError2.classList.add("mensajeInput");
      mensajeError2.innerHTML = "* Campo vacío. Por favor completelo";
  } else {
      //Contraseña invalida, modifico las clases y creo un mensaje de error
      contraseña.classList.add("error");
      mensajeError2.classList.remove("mensajeInputOculto");
      mensajeError2.classList.add("mensajeInput");
      mensajeError2.innerHTML = "* Contraseña invalida. Por favor ingrese otra";
  }
  //Si el usuario y contraseña son validos redirijo al home
  if(isContraseña && isUserName) {
    iniciarSesion();
  }
});
let loader=document.getElementById("loader2"); 


function realizarLoading(){
  loader.classList.remove("oculto");
  // loader.classList.add("loading");
  setTimeout(irHome,1500);
  }

  function irHome(){
    document.location.href ="home.html";
}
