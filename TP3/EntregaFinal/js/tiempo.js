"use strict";

class Tiempo{
    constructor(tiempoTotal, reloj){
        this.tiempoTotal = tiempoTotal; 
        this.tiempo = this.tiempoTotal * 60; //Los segundos totales
        this.reloj = reloj; //Invoca al texto del reloj
        
    }
    //Disminuye el tiempo del reloj
    calcularTiempo(){
        //Si el tiempo finaliza, le informa a los jugadores 
        if(this.tiempo <= 0) {
            this.reloj.innerHTML = 'Fin';
            swal('Finalizó el tiempo PERDISTE!!', ' ', 'error');

            finJuego(); 
           
        }
        //El tiempo sigue y decrementa los segundos
        else{
            
        
            const minutos = Math.floor(this.tiempo / 60);
            let segundos = this.tiempo % 60;
            if(segundos < 10) this.reloj.innerHTML = `${minutos}:0${segundos}`;
            else this.reloj.innerHTML = `${minutos}:${segundos}`;
            this.tiempo --;
           }
        
        
    }


descontarTiempo(){
 //   swal('chocaste se te descuenta 1 minuto', ' ', 'error');
    this.tiempo-=60;
   
}
   
}
