class Ficha{
    constructor(posX, posY, fill, context,jugador){
      
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.resaltado = false;         //atributo para indicar si la figura está siendo seleccionada o no
        this.resaltadoEstilo = 'yellow';       // color del resaltado para la selección
        this.ctx = context;
        this.perteneceA = jugador;
        this.disponible = true;     //atributo para habilitar o deshabilitar la ficha
        this.ubicada = false;       //atributo para indicar que ya fue ubicada en el tablero
       
    }
//Asigna el relleno.
    setFill(fill){      
        this.fill = fill;       
    }
    //setea la posición a partir de x e y
    setPosition(x, y){
        this.posX = x;
        this.posY = y;
    }
    //Retorna el jugador al cual pertenece la ficha
    getPerteneceA(){
        return this.perteneceA;
    }

//Retorna la posición en X e Y
    getPosition() {
        return{
            x : this.getPosX(),
            y : this.getPosY()
        };
    }
//Retorna la posición en X de la ficha
    getPosX(){
        return this.posX;
    }
//Retorna la posición en Y de la ficha
    getPosY(){
        return this.posY;
    }
//Retorna el relleno de la ficha
    getFill(){
        return this.fill;
    }
//Dibuja la ficha, pero en este caso (padre) solo asigna el relleno
    draw(){
       
        this.ctx.fillStyle = this.fill;     
    }
// Setea el atributo resaltado
    setResaltado(resaltado){
        this.resaltado = resaltado;
    }
//Retorna el estilo de resaltado 
    getResaltadoEstilo(){
        return this.resaltadoEstilo;
    }
//Metodo abstracto, me dice si el mouse está adentro de la figura
    isPOintInside(x,y){             

    }
//Retorna disponibilidad de esta ficha
    getDisponible(){
        return this.disponible;
    }
//Setea disponibilidad de la ficha
    setDisponible(disp){
        this.disponible = disp;
    }
//Retorna si esta ficha se encuentra ubicada
    getUbicada(){
        return this.ubicada;
    }

//Setea ubicada de la ficha
    setUbicada(ubicada){
        this.ubicada = ubicada;
    }
    
}