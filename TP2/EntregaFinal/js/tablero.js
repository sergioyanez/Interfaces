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
    // Retorna una copia de los casilleros en el arreglo matriz
    devolverMatriz(){
        let matrizCopia=[];
        for (let i=0;i<this.matriz.length;i++){
            matrizCopia[i] = this.matriz[i];
        }
        return matrizCopia;
    }
   // dibuja el tablero en canva y guarda cada instancia de casillero en el arreglo matriz
    drawTablero(){  
            
            ctx.fillStyle = this.relleno;
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
               
    }        
       
   // Retorna el casillero donde colocar la ficha
    ultimoVacio(columna,ficha){   
    let col = columna;
    let encontrado = null;

        for (let i = 0 ; i< COLUMNAS * FILAS; i++){
            if (this.matriz[i].getCol() == col){
                if (this.matriz[i].getOcupado() == true){
                    if (this.matriz[i].getFila() == 0){
                        swal('Columna completa', 'intente nuevamente', 'error');
                        return null;
                    }else{
                        this.matriz[i-1].setOcupado(true); 
                        this.matriz[i-1].setFichaDeJugador(ficha.getPerteneceA());
                        return this.matriz[i-1];
                        
                    }
                       
                }
                if (this.matriz[i].getFila() == FILAS -1){
                    this.matriz[i].setOcupado(true);
                    this.matriz[i].setFichaDeJugador(ficha.getPerteneceA());
                    encontrado =  this.matriz[i];                
                   
                }
                
                   
            }
              
        } 
    
        return encontrado;              //retorna la posicion de casilla donde ubicar la ficha
    }
    //retorna el index, del casillero en el arreglo matriz
    index(casill){
        return this.matriz.indexOf(casill);
    }
    
    
           
  


}
