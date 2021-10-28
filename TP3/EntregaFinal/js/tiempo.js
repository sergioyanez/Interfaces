"use strict";


class Tiempo {
    constructor(tiempoTotal, reloj) {
        this.tiempoTotal = tiempoTotal;
        this.tiempo = this.tiempoTotal * 60; //Los segundos totales
        this.reloj = reloj; //Invoca al texto del reloj

    }
    //Disminuye el tiempo del reloj
    calcularTiempo() {
        //Si el tiempo finaliza, le informa a los jugadores 
        if (this.tiempo <= 0) {
            sonidoJuego.pause();
            if (sonido == true) {
                sonidoGameOver.play();
            } else {
                sonidoGameOver.pause();
            }
            swal('Finalizó el tiempo PERDISTE!!  GAME OVER..Tu puntaje fue de: ' + puntos, ' ', 'error');

            finJuego();

        }
        //El tiempo sigue y decrementa los segundos
        else {

            const minutos = Math.floor(this.tiempo / 60);
            let segundos = this.tiempo % 60;

            if (segundos < 10) this.reloj.innerHTML = `${minutos}:0${segundos}`;
            else this.reloj.innerHTML = `${minutos}:${segundos}`;
            this.tiempo--;
        }
        return this.tiempo;

    }
    // pone el cronñometro de color rojo para advertir que sólo falta un minuto
    cambiarReloj() {

        this.reloj.setAttribute("class", "relojRojo");
        palabraTiempo.setAttribute("class", "colorRojo");
    }

    // descuenta tiempo cuando sonic choca con algun obstaculo
    descontarTiempo() {
        this.tiempo -= 60;

    }
    //cuando termina el juego se corta el cronómetro y aparece en su lugar Fin de juego
    detenerTiempo() {
        this.reloj.innerHTML = '   Fin de juego';
        palabraTiempo.setAttribute("class", "oculto");
    }

}