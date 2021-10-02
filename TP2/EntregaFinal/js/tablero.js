"use strict";



class Tablero{
    constructor(ctx, width, height, filas, columnas){
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.filas = filas;
        this.columnas = columnas;
        this.imgCasillero = new Image();
        this.imgCasillero.src = "images/casillero.png";
  

        
    }

    drawTablero(){      
     //   alert("entro");
        let inicioX = this.width/4;
        for (let i = 0; i < this.columnas; i++) {
            for (let j = 0; j < this.filas; j++) {
                this.ctx.beginPath();
                this.ctx.drawImage(this.imgCasillero, inicioX+i*84 , 100+j*84 );
                this.ctx.fill();
                this.ctx.closePath();            
            }          
        } 
       }
           
  


}
