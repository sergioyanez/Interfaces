'use strict'
let saltar = false;
let sonic = document.getElementById("sonic");
document.addEventListener("keydown", event =>{
    if(event.code == "ArrowUp"){
        saltar = true;
        cambiarClase(saltar);
     //   alert("flecha arriba");
    }
});

function cambiarClase(saltar){
    if(saltar){
    sonic.setAttribute("class","saltando");
    }
    else
    sonic.setAttribute("class","caminando");
    
}
sonic.addEventListener("animationend", function() { cambiarClase(false)})

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
let obstaculo = document.querySelector(".obstaculo");
//let anillo = document.querySelector(".anillo");
setInterval(detectarColision,1000);
function detectarColision(){      
    let sonicPos = sonic.getBoundingClientRect();       
    let obstaculoPos =  obstaculo.getBoundingClientRect();
    //let anilloPos =anillo.getBoundingClientRect();
    let sonicWidht = sonicPos.left + sonicPos.width;
    let sonicHeight = sonicPos.top + sonicPos.height;
   // let anilloWidht = anilloPos.left + anilloPos.width;
    //let anilloHeight = anilloPos.top + anilloPos.height;
    let obstaculoWidht = obstaculoPos.left+obstaculoPos.width;
    let obstaculoHeight = obstaculoPos.top+obstaculoPos.height;
    if(sonicPos.left<=obstaculoWidht && sonicWidht>=obstaculoPos.left && sonicHeight>=obstaculoPos.top && sonicPos.top <= obstaculoHeight  ){
  //  if(sonicWidht>=obstaculoPos.left && sonicPos.bottom<=obstaculoHeight){     
        console.log("de frente");
        console.log(sonicWidht>=obstaculoPos.left);
        console.log("arriba");
        console.log(sonicPos.bottom<=obstaculoHeight);

     //   console.log(sonicPos.bottom<=obstaculoPos.top);
    //    console.log("choque al saltar antes de pasar: "+sonicHeight>=obstaculoPos.top);
     //   console.log("choque otro: "+sonicPos.top <= obstaculoHeight);
        alert("murio")// restar vidas;
  
    }
   // if(sonicPos.left<=anilloWidht && sonicWidht>=anilloPos.left && sonicHeight>=anilloPos.top && sonicPos.top <= anilloHeight )

  //  alert("suma puntos")
            
  
  }