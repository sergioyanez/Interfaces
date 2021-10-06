"use strict";



class Tablero{
    constructor(ctx, width, height, filas, columnas,img){
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.filas = filas;
        this.columnas = columnas;       
        this.imgCasillero = img;
       
        this.matriz = [];
        
        
    }
   
    drawTablero(){  
            ctx.fillStyle = this.relleno;
        //    this.relleno=ctx.createPattern(imgCasillero,"repeat");  
            let inicioX = this.width/4;
        for (let i = 0; i < this.columnas; i++) {
            for (let j = 0; j < this.filas; j++) {
                this.ctx.beginPath();
                this.ctx.drawImage(this.imgCasillero, inicioX+i*TNO_FICHA , MARGEN_TABLERO+j*TNO_FICHA);
                this.ctx.fill();
                this.ctx.closePath();   
                let casilla = new Casillero(inicioX+i*TNO_FICHA , MARGEN_TABLERO+j*TNO_FICHA,j,i,this.imgCasillero);
                this.matriz.push(casilla);         
            }          
        }       
            
            
        
       }
       //VER CUÁL ES LA POSICIÓN HASTA DONDE BAJAR
       ultimoVacio(ficha){

           return{
            x : this.ficha.getPosX(),
            y : this.ficha.getPosY()
        };;
       }
           
  


}
