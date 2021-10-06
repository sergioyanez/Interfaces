"use strict";

class ZonaJuego{
    constructor(ctx, width, height, columnas){
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.columnas = columnas;       
       
}

drawZonaJuego(){     //crea una fila con la cantidad de columnas que tiene el tablero
    ctx.fillStyle = "rgba(255,255,255,0.1)";   //lo rellene de blanco con transparencia por el momento para identificarlo.
    let inicioX = this.width/4;
    for (let i = 0; i < this.columnas; i++) {
    ctx.fillRect(inicioX+i*84,0,84,84) ;   
    }
                 
}       
    
    

}
