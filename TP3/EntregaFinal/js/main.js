'use strict'

const MiliSegundos = 1000;
let jugando = false;
let saltar = false;
let morir = false;
let fin = false;
let interval;
let reloj = null;
let puntos = 0;
let colAbeja = false;
let colAnillo = false;
let mostrarCartel = false;
let sonido = true;
let cartel = document.getElementById("cartel");
let puntaje = document.getElementById("puntaje");
let sonic = document.querySelector("#sonic");
let obstaculo = document.querySelector("#obstaculo");
let obstaculo2 = document.querySelector("#obstaculo2");
let anillo = document.querySelector("#anillo");
let cielo = document.querySelector(".cielo");
let islasYmar = document.getElementById("islas_y_mar");
let piso = document.getElementById("piso");
let t = document.getElementById("tiempo");
let palabraTiempo = document.getElementById("cartel2");
let explicacion = document.querySelector(".explicacion");
let btnReiniciar = document.querySelector(".reiniciar");
btnReiniciar.addEventListener("click", reiniciar);
let btnIniciar = document.querySelector(".iniciar");
btnIniciar.addEventListener("click", iniciarJuego);
let avatar1 = document.querySelector(".Sonic1");
avatar1.addEventListener("click", elegirAvatar1);
let avatar2 = document.querySelector(".Sonic2");
avatar2.addEventListener("click", elegirAvatar2);
let elegirPersonaje = document.querySelector(".elijePersonaje");
let personaje = null;
let escenario = null;
let escenario1 = document.querySelector(".escenario1");
escenario1.addEventListener("click", elegirEscenario1);
let escenario2 = document.querySelector(".escenario2");
escenario2.addEventListener("click", elegirEscenario2);
let sonidoAnillo = document.getElementById("anilloSound");
let sonidoVictoria = document.getElementById("victorySound");
let sonidoJuego = document.getElementById("gameSound");
let sonidoChoque = document.getElementById("chocaSound");
let sonidoGameOver = document.getElementById("gameOverSound");
let btnSonido = document.getElementById("sonido");
btnSonido.addEventListener("click", quitarSonido);

//Mutea todo el sonido
function quitarSonido() {
    if (sonido == true) {
        sonido = false;
        sonidoAnillo.pause();
        sonidoVictoria.pause();
        sonidoChoque.pause();
        sonidoJuego.pause();
        btnSonido.classList.remove("volumen");
        btnSonido.classList.add("enmudecer")
    } else {
        sonido = true;
        sonidoJuego.play();
        btnSonido.classList.remove("enmudecer");
        btnSonido.classList.add("volumen")
    }

}
//permite elegir el avatar 1 sonic azul
function elegirAvatar1() {
    personaje = "Sonic1";
    avatar1.setAttribute("class", "ocult");
    avatar2.setAttribute("class", "ocult");
}

// Permite elegir el avatar 2 sonic azul oscuro y rojo
function elegirAvatar2() {
    personaje = "Sonic2";
    sonic.classList.remove("caminando");
    sonic.classList.add("caminando2");
    avatar1.setAttribute("class", "ocult");
    avatar2.setAttribute("class", "ocult");

}
//Permite elegir el escenario de día
function elegirEscenario1() {
    escenario = "Escenario1";
    escenario1.setAttribute("class", "ocult");
    escenario2.setAttribute("class", "ocult");

}
//Permite elegir el escenario de noche
function elegirEscenario2() {
    escenario = "Escenario2";
    cielo.classList.remove("cielo1");
    cielo.classList.add("cielo2");
    escenario1.setAttribute("class", "ocult");
    escenario2.setAttribute("class", "ocult");
}

// vuelve a la pantalla inicial
function reiniciar() {
    window.location.reload();
}

// sonic salta al presionar flecha arriba
document.addEventListener("keydown", event => {
    if (event.code == "ArrowUp") {
        saltar = true;
        cambiarClase(saltar)
    }
});


//Cambia sonic caminando por sonic saltando, hecho una bolita y viceversa
function cambiarClase(saltar) {
    if (saltar) {
        if (personaje == "Sonic1") {
            
            sonic.setAttribute("class", "saltando");
        } else {
            sonic.setAttribute("class", "saltando2");
        }

    } else if (personaje == "Sonic1") {
        sonic.setAttribute("class", "caminando");
    } else {
        sonic.setAttribute("class", "caminando2");
    }
}
// luego de que sonic salta hecho una bolita, vuelve a caminar
sonic.addEventListener("animationend", function () {
    cambiarClase(false);
})


// Cambia sonic caminando por una explosión
function cambiarClase2(morir) {
    if (morir) {
        sonic.setAttribute("class", "morir");
    }
}


// Muestra cartel de que ha perdido tiempo
function mostraCartel(mostrarCartel) {

    if (mostrarCartel) {
        cartel.setAttribute("class", "cartel");
    } else
        cartel.setAttribute("class", "oculto");
}
cartel.addEventListener("animationend", function () {
    mostraCartel(false)
})


//Pone en pausa todas las animaciones al terminar el juego
function pausarAnimaciones() {

    sonic.style.animationPlayState = "paused";
    obstaculo.style.animationPlayState = "paused";
    cielo.style.animationPlayState = "paused";
    islasYmar.style.animationPlayState = "paused";
    piso.style.animationPlayState = "paused";
    anillo.style.animationPlayState = "paused";
    obstaculo2.style.animationPlayState = "paused";

}

//Detecta si el div de sonic colisiona con el div del pincho, la abeja o el anillo
//Suma puntos o resta minutos de tiempo

function detectarColision() {
    morir = false;
    obstaculo.setAttribute("class", "obstaculo");
    obstaculo2.setAttribute("class", "obstaculo2");
    anillo.setAttribute("class", "anillo");
    if (fin == false) {

        let sonicPos = sonic.getBoundingClientRect(); //tomo las coordenadas left,top,right,bottom (izquierda, arriba,derecha, abajo derecha) del div sonic      
        let pinchoPos = obstaculo.getBoundingClientRect(); //tomo las coordenadas  left,top,right,bottom (izquierda, arriba,derecha, abajo derecha) del div obstaculo ( pincho ) 
        let abejaPos = obstaculo2.getBoundingClientRect(); //tomo las coordenadas  left,top,right,bottom (izquierda, arriba,derecha, abajo derecha) del div obstaculo2 ( abeja )   
        let anilloPos = anillo.getBoundingClientRect(); //tomo las coordenadas  left,top,right,bottom (izquierda, arriba,derecha, abajo derecha) del div anillo  
        let abejaWidht = abejaPos.left + abejaPos.width;
        let abejaHeight = abejaPos.top + abejaPos.height;
        let sonicWidht = sonicPos.left + sonicPos.width;
        let sonicHeight = sonicPos.top + sonicPos.height;
        let anilloWidht = anilloPos.left + anilloPos.width;
        let anilloHeight = anilloPos.top + anilloPos.height;
        let pinchoWidht = pinchoPos.left + pinchoPos.width;
        let pinchoHeight = pinchoPos.top + pinchoPos.height;

        //si sonic colisiona con la abeja se descuenta tiempo y la abeja vuelve a la posición inicial
        if (sonicPos.left <= abejaWidht &&
            sonicWidht >= abejaPos.left &&
            sonicHeight >= abejaPos.top &&
            sonicPos.top <= abejaHeight) {
            if (sonido == true) {
                sonidoChoque.play();
            } else {
                sonidoChoque.pause();
            }

            obstaculo2.classList.remove("obstaculo2");
            morir = true;
            cambiarClase2(morir);
            mostrarCartel = true;
            mostraCartel(mostrarCartel)
            reloj.descontarTiempo();
        }

        //si sonic colisiona con el pincho se descuenta tiempo y el pincho vuelve a la posicion inicial
        if (sonicPos.left <= pinchoWidht &&
            sonicWidht >= pinchoPos.left &&
            sonicHeight >= pinchoPos.top &&
            sonicPos.top <= pinchoHeight) {
            if (sonido == true) {
                sonidoChoque.play();
            } else {
                sonidoChoque.pause();
            }
            obstaculo.classList.remove("obstaculo");
            morir = true;
            cambiarClase2(morir);
            mostrarCartel = true;
            mostraCartel(mostrarCartel)
            reloj.descontarTiempo();
        }

        //si sonic colisiona con el anillo se suma puntaje y el anillo vuelve a la posición inicial  
        if (sonicPos.left <= anilloWidht &&
            sonicWidht >= anilloPos.left &&
            sonicHeight >= anilloPos.top &&
            sonicPos.top <= anilloHeight) {
            anillo.classList.remove("anillo");
            if (fin == false)
                if (sonido == true) {
                    sonidoAnillo.play();
                }
            else {
                sonidoAnillo.pause();
            }
            sumarPuntos();
            if (puntos == 10) {
                sonidoJuego.pause();
                if (sonido == true) {
                    sonidoVictoria.play();
                } else {
                    sonidoVictoria.pause();
                }
                swal('Ganaste el juego, GAME OVER... tu puntaje fue de: ' + puntos, ' ', 'success');
                finJuego();
            }
        }
    }
    return morir;
}


// acumula los puntos obtenidos
function sumarPuntos() {
    puntos++;
    puntaje.innerHTML = puntos;
}


// muestra el tiempo de juego que resta para terminar
function tiempoDeJuego() {
    if (interval != null) {
        clearInterval(interval);
    }
    reloj = new Tiempo(10, t);
    if (fin == false) {
        interval = setInterval(function () {
            reloj.calcularTiempo();
            if (reloj.calcularTiempo() < 60 && reloj.calcularTiempo() > 0) {
                palabraTiempo.setAttribute("class", "colorRojo");
            }
        }, MiliSegundos);
    }
}

// inicia el juego
function iniciarJuego() {

    if (personaje != null && escenario != null) {
        elegirPersonaje.setAttribute("class", "ocult");
        explicacion.classList.add("ocult");
        jugando = true;
        sonidoJuego.play();
        btnSonido.classList.remove("ocult");
        if (jugando) {
            reacomodarClases();
            //ejecuta la función detectarColisión cada 500 milisegundos
            setInterval(detectarColision, 500);
        }
        tiempoDeJuego();
    } else {
        swal("Debes elegir un personaje y un escenario", "", "error");
    }

}


// remueve la clase ocult de los elementos y les coloca las clases necesarias para poder empezar a jugar
function reacomodarClases() {
    btnIniciar.classList.remove("iniciar");
    btnIniciar.classList.add("ocult");
    sonic.classList.remove("ocult");
    anillo.classList.remove("ocult");
    obstaculo.classList.remove("ocult");
    obstaculo2.classList.remove("ocult");
    if (personaje == "Sonic1") {
        sonic.classList.add("caminando");
    } else {
        sonic.classList.add("caminando2");
    }

    anillo.classList.add("anillo");
    obstaculo.classList.add("obstaculo");
    obstaculo2.classList.add("obstaculo2");

}

// finaliza el juego
function finJuego() {
    jugando = false;
    fin = true;
    pausarAnimaciones();
    clearInterval(interval);
    reloj.detenerTiempo();
    btnSonido.classList.add("ocult");
    btnReiniciar.classList.remove("ocult");
    btnReiniciar.classList.add("desocultar");
}