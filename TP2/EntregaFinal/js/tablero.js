"use strict";



class Tablero{
    constructor(ctx, width, height, filas, columnas,img){
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.filas = filas;
        this.columnas = columnas;       
        this.imgCasillero = img;       
        this.casilla = null;
        this.matriz = [];
        
    }
   
    drawTablero(){  
        
            ctx.fillStyle = this.relleno;
        //    this.relleno=ctx.createPattern(imgCasillero,"repeat");  
            let inicioX = this.width/4;
        for (let i = 0; i < this.columnas; i++) {
            for (let j = 0; j <this.filas; j++) {
                let posX=inicioX + i*TNO_FICHA;
                let posY=MARGEN_TABLERO + j*TNO_FICHA;     
                 this.casilla = new Casillero(posX , posY, j, i, this.imgCasillero);
                this.ctx.beginPath();
                this.ctx.drawImage(this.imgCasillero, inicioX+i*TNO_FICHA , MARGEN_TABLERO+j*TNO_FICHA);
                this.ctx.fill();
                this.ctx.closePath();               
                this.matriz.push(this.casilla);  
                      
            }          
        } 
        //console.log(this.matriz);        
    }        
          
        
       
       //VER CUÁL ES LA POSICIÓN HASTA DONDE BAJAR
    ultimoVacio(columna){
        
        let aux = this.filas-1;
        for(let j=this.filas-1;j<=0;i--){
          if(this.matriz[j,columna]==null){
           return j;
          }          
        }
     return aux; 
    }
    
           
  


}
