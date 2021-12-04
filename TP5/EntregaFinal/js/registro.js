'use strict'

let btnRegistrar = document.getElementById("registrarCta");
    btnRegistrar.addEventListener("click",registrarCuenta);

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