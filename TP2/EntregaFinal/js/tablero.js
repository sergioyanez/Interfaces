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

    devolverMatriz(){
        let matrizCopia=[];
        for (let i=0;i<this.matriz.length;i++){
            matrizCopia[i] = this.matriz[i];
        }
        return matrizCopia;
    }
   
    drawTablero(){  

            ctx.fillStyle = this.relleno;
        //    this.relleno=ctx.createPattern(imgCasillero,"repeat");  
            let inicioX = INICIO_TABLERO;
        for (let i = 0; i < this.columnas; i++) {
            for (let j = 0; j <this.filas; j++) {
                let posX=inicioX + i*TNO_FICHA;
                let posY=MARGEN_TABLERO + j*TNO_FICHA;     
                
                this.ctx.beginPath();
                this.ctx.drawImage(this.imgCasillero, inicioX+i*TNO_FICHA , MARGEN_TABLERO+j*TNO_FICHA);
                this.ctx.fill();
                this.ctx.closePath(); 
                if (this.matriz.length < COLUMNAS * FILAS)       {
                    this.casilla = new Casillero(posX , posY, j, i, this.imgCasillero);
                    this.matriz.push(this.casilla);
                }       
                  
                      
            }          
        } 
        //console.log(this.matriz);        
    }        
    
        
       
       //VER CUÁL ES LA POSICIÓN HASTA DONDE BAJAR
    ultimoVacio(columna,ficha){   
    let col = columna;
    let encontrado = null;

        for (let i = 0 ; i< COLUMNAS * FILAS; i++){
            // console.log("pos matriz "+i+"columna: "+this.matriz[i].getCol()+" fila"+ this.matriz[i].getFila()
            // + "ocupado "+this.matriz[i].getOcupado());
            if (this.matriz[i].getCol() == col){
             //   console.log("evaluo "+this.matriz[i].getCol()+" "+this. matriz[i].getFila());
                if (this.matriz[i].getOcupado() == true){
                    if (this.matriz[i].getFila() == 0){
                        alert("columna completa");
                        return null;
                    }else{
                   //     alert("encontro un true y no esta en la primer fila "+this.matriz[i-1].getPosition().y);
                        this.matriz[i-1].setOcupado(true); 
                        this.matriz[i-1].setFichaDeJugador(ficha.getPerteneceA());
                     //   console.log( this.matriz[i-1]);  
                        
                           
                        return this.matriz[i-1];
                        
                    }
                       
                }
                if (this.matriz[i].getFila() == FILAS -1){
                    this.matriz[i].setOcupado(true);
                    this.matriz[i].setFichaDeJugador(ficha.getPerteneceA());
               //     console.log( this.matriz[i]); 
                   
                    encontrado =  this.matriz[i];                
                   
                }
                
                   
            }
              
        } 
    
    //     console.log(encontrado);       
        return encontrado;              //retorna la posicion de casilla donde ubicar la ficha
    }
    
    index(casill){
        return this.matriz.indexOf(casill);
    }
    
    
           
  


}
