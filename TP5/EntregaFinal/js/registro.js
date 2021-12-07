'use strict'



function registrarCuenta(){
    document.location.href ="login.html";
}



let btnVolver = document.getElementById("volver");
    btnVolver.addEventListener("click",volver);

function volver(){
    document.location.href ="login.html";
}

const logo = document.getElementById("logo");
    

function move(x, y) {
  let dx = (x - window.innerWidth) / window.innerWidth * (-10),
      dy = (-2*y - window.innerHeight) / window.innerHeight * (-20);
      logo.style.right = `${dx}px`;
      logo.style.top = `${dy}px`;
  dx += 5;
  dy += 5 + 10;
 
}

document.addEventListener('mousemove', (e) => {
  move(e.pageX, e.pageY);
});
document.addEventListener('touchmove', (e) => {
  move(e.touches[0].pageX, e.touches[0].pageY);
});


/*---------------------------------------------------------------
-----------------------------------------------------------------
---------------------------------------------------------------*/

document.getElementById("registrarCta").addEventListener("click", ()=> {
  //Creo booleanos para saber si la contraseña y usuario son correctos
  let isEmail = false;
  let isUserName = false;
  let isUserApellido = false;
  let isContraseñaValida = false;
  let isContraseñaRepetida = false;
  let isUserMatricula = false;
  //Obtengo los inputs y mensajes de error
  let email = document.getElementById("correo");
  let userName = document.getElementById("nombre"); 
  let contraseñaValida = document.getElementById("contrasenia");
  let contraseñaRepetida = document.getElementById("repContrasenia");
  let userApellido = document.getElementById("apellido");
  let userMatricula = document.getElementById("matricula");

  let mensajeError1 = document.getElementById("mError1");
  let mensajeError2 = document.getElementById("mError2");
  let mensajeError3 = document.getElementById("mError3");
  let mensajeError4 = document.getElementById("mError4");
  let mensajeError5 = document.getElementById("mError5");
  let mensajeError6 = document.getElementById("mError6");


//   let format1 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
//   function hasUpperCase(str) {
//       return (/[A-Z]/.test(str));
//   }

  //Chequeo si el email es valido
  if(email.value.includes("@gmail.com") || email.value.includes("@hotmail.com")){
      //Usuario valido, modifico las clases y seteo el booleano en true
      email.classList.remove("error");
      mensajeError1.classList.remove("mensajeInput");
      mensajeError1.classList.add("mensajeInputOculto");
      isEmail = true;
  } else if (email.value.length == 0) {
      //Usuario invalido, modifico las clases y creo el mensaje de error
      email.classList.add("error");
      mensajeError1.classList.remove("mensajeInputOculto");
      mensajeError1.classList.add("mensajeInput");
      mensajeError1.innerHTML = "* Campo vacío. Por favor completelo";
  } else {
      //Usuario invalido, modifico las clases y creo el mensaje de error
      email.classList.add("error");
      mensajeError1.classList.remove("mensajeInputOculto");
      mensajeError1.classList.add("mensajeInput");
      mensajeError1.innerHTML = "* Por favor insertar email tipo @gmail o @hotmail";
  }
  //Chequeo si el usuario es valido
  if((userApellido.value == "yanez" && userName.value == "sergio")|| (userApellido.value == "kehler" && userName.value == "elva")){
      //Usuario invalido, modifico las clases y creo el mensaje de error
      userName.classList.add("error");
      mensajeError2.classList.remove("mensajeInputOculto");
      mensajeError2.classList.add("mensajeInput");
      mensajeError2.innerHTML = "* Nombre de usuario ya existente. Por favor ingrese otro";
  } else if (userName.value.length == 0) {
      //Usuario invalido, modifico las clases y creo el mensaje de error
      userName.classList.add("error");
      mensajeError2.classList.remove("mensajeInputOculto");
      mensajeError2.classList.add("mensajeInput");
      mensajeError2.innerHTML = "* Campo vacío. Por favor completelo";
  } else {
      //Usuario valido, modifico las clases y seteo el booleano en true
      userName.classList.remove("error");
      mensajeError2.classList.remove("mensajeInput");
      mensajeError2.classList.add("mensajeInputOculto");
      isUserName = true;
  }

  //Chequeo si el apellido es valido
  if((userApellido.value == "yanez" && userName.value == "sergio")|| (userApellido.value == "kehler" && userName.value == "elva")){
    //Usuario invalido, modifico las clases y creo el mensaje de error
    userApellido.classList.add("error");
    mensajeError5.classList.remove("mensajeInputOculto");
    mensajeError5.classList.add("mensajeInput");
    mensajeError5.innerHTML = "* Nombre de usuario ya existente. Por favor ingrese otro";
} else if (userApellido.value.length == 0) {
    //Usuario invalido, modifico las clases y creo el mensaje de error
    userApellido.classList.add("error");
    mensajeError5.classList.remove("mensajeInputOculto");
    mensajeError5.classList.add("mensajeInput");
    mensajeError5.innerHTML = "* Campo vacío. Por favor completelo";
} else {
    //Usuario valido, modifico las clases y seteo el booleano en true
    userApellido.classList.remove("error");
    mensajeError5.classList.remove("mensajeInput");
    mensajeError5.classList.add("mensajeInputOculto");
    isUserApellido = true;
}
 //Chequeo si la matricula es valido
 if(userMatricula.value == "123456" ){
  //Usuario invalido, modifico las clases y creo el mensaje de error
  userMatricula.classList.add("error");
  mensajeError6.classList.remove("mensajeInputOculto");
  mensajeError6.classList.add("mensajeInput");
  mensajeError6.innerHTML = "* Nombre de usuario ya existente. Por favor ingrese otro";
} else if (userApellido.value.length == 0) {
  //Usuario invalido, modifico las clases y creo el mensaje de error
  userMatricula.classList.add("error");
  mensajeError6.classList.remove("mensajeInputOculto");
  mensajeError6.classList.add("mensajeInput");
  mensajeError6.innerHTML = "* Campo vacío. Por favor completelo";
} else {
  //Usuario valido, modifico las clases y seteo el booleano en true
  userMatricula.classList.remove("error");
  mensajeError6.classList.remove("mensajeInput");
  mensajeError6.classList.add("mensajeInputOculto");
  isUserMatricula = true;
}

  //Chequeo si la contraseña es valida
//   if(format1.test(contraseñaValida.value) && hasUpperCase(contraseñaValida.value)){
//       //Contraseña valida, modifico las clases y seteo el booleano en true
//       contraseñaValida.classList.remove("error");
//       mensajeError3.classList.add("mensajeInputOculto");
//       mensajeError3.classList.remove("mensajeInput");
//       isContraseñaValida = true;
//   } else 
   if (contraseñaValida.value.length == 0) {
      //Contraseña invalida, modifico las clases y creo un mensaje de error
      contraseñaValida.classList.add("error");
      mensajeError3.classList.remove("mensajeInputOculto");
      mensajeError3.classList.add("mensajeInput");
      mensajeError3.innerHTML = "* Campo vacío. Por favor completelo";
   } else{
    isContraseñaValida = true;
   }
   //else {
//       //Contraseña invalida, modifico las clases y creo un mensaje de error
//       contraseñaValida.classList.add("error");
//       mensajeError3.classList.remove("mensajeInputOculto");
//       mensajeError3.classList.add("mensajeInput");
//       mensajeError3.innerHTML = "* Debe tener un caracter especial y una mayuscula";
//   }
  //Chequeo si la contraseña repetida es valida
  if(contraseñaRepetida.value !== contraseñaValida.value){
      //Contraseña invalida, modifico las clases y creo un mensaje de error
      contraseñaRepetida.classList.add("error");
      mensajeError4.classList.remove("mensajeInputOculto");
      mensajeError4.classList.add("mensajeInput");
      mensajeError4.innerHTML = "* Las contraseñas no coinciden";
  } else if (contraseñaRepetida.value.length == 0) {
      //Contraseña invalida, modifico las clases y creo un mensaje de error
      contraseñaRepetida.classList.add("error");
      mensajeError4.classList.remove("mensajeInputOculto");
      mensajeError4.classList.add("mensajeInput");
      mensajeError4.innerHTML = "* Campo vacío. Por favor completelo";
  } else {
      //Contraseña valida, modifico las clases y seteo el booleano en true
      contraseñaRepetida.classList.remove("error");
      mensajeError4.classList.add("mensajeInputOculto");
      mensajeError4.classList.remove("mensajeInput");
      isContraseñaRepetida = true;
  }
  //Si el usuario y contraseña son validos redirijo al home
  if(isEmail && isUserName && isContraseñaValida && isContraseñaRepetida && isUserMatricula) {
    realizarLoading();
  }
});



let loader=document.getElementById("loader2"); 

function realizarLoading(){
  loader.classList.remove("oculto");
  // loader.classList.add("loading");
  setTimeout(registrarCuenta,1500);
  }