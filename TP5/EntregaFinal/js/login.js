'use strict'

let btnIniciarSesion = document.getElementById("btnIniciar");
    btnIniciarSesion.addEventListener("click",iniciarSesion);

function iniciarSesion(){
    document.location.href ="home.html";
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

