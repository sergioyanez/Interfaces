class FichaRedonda extends Ficha{

    constructor(posX,posY, radius, fill, context,jugador){
        super(posX, posY, fill, context,jugador);
        this.radius = radius;        
    }
// Dibuja la ficha en canva
   draw(){
            super.draw();       //llama al draw del padre, solo le pone el fill, el color de relleno       
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.posX,this.posY,this.radius,0,2*Math.PI);            
            ctx.clip();         
          
            this.ctx.drawImage(this.fill,this.posX-this.radius,this.posY- this.radius,this.radius*2,this.radius*2);
           
            ctx.beginPath();
            ctx.arc(this.posX , this.posY, this.radius, 0, Math.PI * 2);
            ctx.restore();
            ctx.closePath();  
     
        //si la ficha está seleccionada le asigna un resaltado
        if (this.resaltado === true){
            this.ctx.strokeStyle = this.resaltadoEstilo;      //setea de color amarillo el borde
            this.ctx.lineWidth = 5;
            this.ctx.stroke();       //solo dibuja contorno            
        }   
    }

    //retorna el radio de la ficha
    getRadius(){
        return this.radius;
    }

    //Recorre todas las fichas y le pide su posición y se fija si el puntero está adentro //distancia entre dos puntos   
    isPointInside(x,y){   
        let _x = this.posX - x;  //pos del circulo - la pos donde esta el mouse
        let _y = this.posY - y;
        return  Math.sqrt(_x * _x + _y * _y) < this.radius;  //si raiz cuadrada de x2 + y2, si es menos al radio estoy en el circulo
    }

}