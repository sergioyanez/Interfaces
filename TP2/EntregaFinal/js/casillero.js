class Casillero{

    constructor (posX,posY,fila,col, img){
        this.posX = posX;
        this.posY = posY;
        this.fila = fila;
        this.col = col;
        this.img = img;
        this.ocupado = false;
        this.ficha = null;   //para saber a qué jugador pertenece la ficha
        
    }
    

    getPosX(){
        return this.posX;
    }
    
    getPosY(){
        return this.posY;
    }
    
    getPosition() {
        return{
            x : this.getPosX(),
            y : this.getPosY()
        };
    }

   

    getFila(){
        return this.fila;
    }

    getCol(){
        return this.col;
    }

    getImg(){
        return this.img;
    }

    setImg(imagen){
    this.img = imagen;
    }

    getOcupado(){
        return this.ocupado;
    }

    setOcupado(ocupado){
        this.ocupado = ocupado;
    }

    
}