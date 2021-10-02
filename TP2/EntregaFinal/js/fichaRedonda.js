class FichaRedonda extends Ficha{

    constructor(posX,posY, radius, fill, context){
        super(posX, posY, fill, context);
       
        this.radius = radius;
        

        
    }

    draw(){
        super.draw();       //llama al draw del padre, solo le pone el fill, el color de relleno
       
          ctx.beginPath();
      // ctx.drawImage(this.fill,this.posX,this.posY,this.radius,0,2*Math.PI); 
        ctx.arc(this.posX,this.posY,this.radius,0,2*Math.PI);  
       ///// this.ctx.drawImage()  
        ctx.fill();
       
        if (this.resaltado === true){
            this.ctx.strokeStyle = this.resaltadoEstilo;      //setea de color amarillo el borde
            this.ctx.lineWidth = 5;
            this.ctx.stroke();       //solo dibuja contorno
            
        }
        this.ctx.closePath;
    }
 
    getRadius(){
        return this.radius;
    }
       
       
    isPointInside(x,y){   //recorre todas las fichas y le pide su posición y se fija si el puntero está adentro //distancia entre dos puntos
        let _x = this.posX - x;  //pos del circulo - la pos donde esta el mouse
        let _y = this.posY - y;
        return  Math.sqrt(_x * _x + _y * _y) < this.radius;  //si raiz cuadrada de x2 + y2, si es menos al radio estoy en el circulo
    }

}