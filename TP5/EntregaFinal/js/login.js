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

const svg = document.getElementById('logoCompleto'),
      logos = document.getElementById('.imagen1'),
      image = document.getElementById('imagen2');

function move(x, y) {
  let dx = (x - window.innerWidth) / window.innerWidth * 10,
      dy = (y - window.innerHeight) / window.innerHeight * 10;
  svg.style.left = `${dx}vmin`;
  svg.style.top = `${dy}vmin`;
  dx += 5;
  dy += 5 + 10;
  logos.forEach((logo) => {
    logo.setAttribute('transform', `translate(${dx} ${dy})`);
  });
  image.setAttribute('x', 0);
}

document.addEventListener('mousemove', (e) => {
  move(e.pageX, e.pageY);
});
document.addEventListener('touchmove', (e) => {
  move(e.touches[0].pageX, e.touches[0].pageY);
});

