class Ficha{
    constructor(posX, posY, fill, context,jugador){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.resaltado = false;         //variable para indicar si la figura está siendo seleccionada o no
        this.resaltadoEstilo = 'yellow';       // color del resaltado para la selección
        this.ctx = context;
        this.perteneceA = jugador;
        this.disponible = true;
    }

    setFill(fill){      //cambiar el color de relleno, acá va la imagen apra la ficha
        this.fill = fill;       
    }

    setPosition(x, y){
        this.posX = x;
        this.posY = y;
    }

    getPerteneceA(){
        return this.perteneceA;
    }


    getPosition() {
        return{
            x : this.getPosX(),
            y : this.getPosY()
        };
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getFill(){
        return this.fill;
    }

    draw(){
       
        this.ctx.fillStyle = this.fill;     //para poder hacer fichas redondas o cuadradas.
    }

    setResaltado(resaltado){
        this.resaltado = resaltado;
    }

    isPOintInside(x,y){             //Metodo abstracto, me dice si el mouse está adentro de la figura

    }
    getDisponible(){
        return this.disponible;
    }
    setDisponible(disp){
        this.disponible = disp;
    }
    
}