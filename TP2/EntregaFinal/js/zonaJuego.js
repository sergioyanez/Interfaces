"use strict";

class ZonaJuego{
    constructor(ctx, width, height, columnas){
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.columnas = columnas;       
       
}

drawZonaJuego(){     //crea una fila con la cantidad de columnas que tiene el tablero
    ctx.fillStyle = "rgba(255,255,255,0.5)";   //lo rellene de blanco con transparencia por el momento para identificarlo.
    let inicioX = INICIO_TABLERO;
    for (let i = 0; i < this.columnas; i++) {
        ctx.fillRect(inicioX+i*TNO_FICHA,0,TNO_FICHA-FRONTERA,MARGEN_TABLERO) ; 


    }
                 
}
//ACA AGREGUE ESTA FUNCION
//verifica que la ficha se encuentre en la zona de juego, para luego desplazarla
inZonaJuego(ficha){
    let posX = ficha.getPosX();
    let posY = ficha.getPosY();
    for (let i = 0;i<COLUMNAS;i++){
      //  alert ("entra el for");
       if( (posX > (INICIO_TABLERO+i*TNO_FICHA) +FRONTERA) && (posX < ((INICIO_TABLERO+i*TNO_FICHA)-FRONTERA)+ TNO_FICHA) && (posY < MARGEN_TABLERO)){
        //    alert("esta en zona for" + ficha.getPosX());
            
            return true;
        }            
    }
   return false;
    }       
    
    

}
