
function verificarGanador(){
   
   let matriz = tablero.devolverMatriz();
   let fichasJugadas = cantFichasJugadas(matriz);
   let ganador = null;
   //esEmpate(fichasJugadas);
  // console.log(matriz);
   ganador = ganadorPorColumna(matriz);
   if (ganador != null){
    alert(ganador);
   }
   
   return "verificando";
    
}

function cantFichasJugadas(matriz){
    let cantidad = 0; 
    for(let i=0;i<matriz.length;i++){
        
        if(matriz[i].getOcupado()== true)
              cantidad++;
    }
    return cantidad;
}

function esEmpate(fichasJugadas) {

    if (fichasJugadas == CANT_FICHAS) {
        
        return true;
    }
 
  }

  function ganadorPorColumna(matriz){
    let columna=0;
    let jugador = null;
    let juegoGanado = false;
    let cant=0;
    while(columna < COLUMNAS && juegoGanado == false){
        for(let i=0;i<matriz.length;i++){ //recorre la matriz d casilleros
            if(matriz[i].getCol()==columna ){
            //    console.log("evaluando "+matriz[i].getCol()+" "+matriz[i].getFila());
                if (matriz[i].getFichaDeJugador()!=null && cant ==0){  //la primera ficha
                     jugador = matriz[i].getFichaDeJugador();
                     cant++;
 
                 }else if (matriz[i].getFichaDeJugador()==jugador &&  cant < NUMERO_GANADOR){ 
                     cant++;
                 }else if(matriz[i].getFichaDeJugador()!=jugador){
                    cant = 1;
                    jugador = matriz[i].getFichaDeJugador();
                  //  alert("cambia de jugador");
                 } 
                if (cant == NUMERO_GANADOR){
                    juegoGanado = true;
                    return jugador; 
                }                    
            }                      
        }
                // console.log(matriz[i].getCol()+" "+matriz[i].getFila())             
        
        columna++;
    } 
      return jugador;  
             
    }

  

/*
function juegoTerminado(lastClicFicha) {
  if (
      ganadorPorFila(lastClicFicha) ||
      ganadorPorColumna(lastClicFicha) ||
      ganadorPorDiagonal(lastClicFicha)
  ) {
      return true;
  }
  if (esEmpate()) {
      alert("Juego Empatado!");
      return true;
  }
  return false;
}


function esEmpate() {

  if (fichasJugadores == CANT_FICHAS) {
      return true;
  }
}


function ganadorPorColumna(lastClicFicha) {
  let x = lastClicFicha.getPosX();
  let y = lastClicFicha.getPosY();
  let jugador = lastClicFicha.getPerteneceA();
  let ganador = false;

  if (recuCol(x, y, player, lastClicFicha, ganador) >= NUMERO_GANADOR) {
    ganador = true;
      let aux = recuCol(x, y, jugador, lastClicFicha, ganador);
      return true;
  }
}

function ganadorPorFila(lastClicFicha) {
  let x = lastClicFicha.getPosX() - TNO_FICHA / 2; //posX de la celda que contiene la ultima ficha insertada
  let y = lastClicFicha.getPosY() - TNO_FICHA / 2; //posY de la celda que contiene la ultima ficha insertada
  let jugador = lastClicFicha.getPerteneceA();
  let ganador = false;
//console.log(x,y,jugador,ganador);
  let contFilaIzquierda = recuFilaIzq(x, y, jugador, lastClicFicha, ganador);
  let contFilaDerecha = recuFilaDer(x, y, jugador, lastClicFicha, ganador);

  if ((contFilaIzquierda + contFilaDerecha - 1) >= NUMERO_GANADOR) {
      ganador = true;
      leftRowCount = recuFilaIzq(x, y, jugador, lastClicFicha, ganador);
      rightRowCount = recuFilaDer(x, y, jugador, lastClicFicha, ganador);
      return true;
  }
}

function ganadorPorDiagonal(lastClicFicha) {
  let x = lastClicFicha.getPosX() - TNO_FICHA / 2; //posX de la celda que contiene la ultima ficha insertada
  let y = lastClicFicha.getPosY() - TNO_FICHA / 2; //posY de la celda que contiene la ultima ficha insertada
  let jugador = lastClicFicha.getPerteneceA();
  let ganador = false;

  let diagIzqArriba = recuDiagLeftUp(x, y, jugador, lastClicFicha, ganador);
  let diagDerAbajo = recuDiagRightDown(x, y, jugador, lastClicFicha, ganador);

  let diagDerArriba = recuDiagRightUp(x, y, jugador, lastClicFicha, ganador);
  let diagIzqAbajo = recuDiagLeftDown(x, y, jugador, lastClicFicha, ganador);

  if ((diagIzqArriba + diagDerAbajo - 1) >= NUMERO_GANADOR) {
    ganador = true;
    diagIzqArriba = recuDiagIzqArriba(x, y, jugador, lastClicFicha, ganador);
    diagDerAbajo = recuDiagDerAbajo(x, y, jugador, lastClicFicha, ganador);
      return true;
  }

  if ((diagDerArriba + diagIzqAbajo - 1) >= NUMERO_GANADOR) {
    ganador = true;
    diagDerArriba = recuDiagDerArriba(x, y, jugador, lastClicFicha, ganador);
    diagIzqAbajo = recuDiagIzqAbajo(x, y, jugador, lastClicFicha, ganador);
      return true;
  }
}

//Esta funcion me devuelve el "id" de una figura en (x,y)

function getFichaPorCoord(x, y) {
  for (let i = 0; i < fichas.length; i++) {
      if (fichas[i].getPosX() == x && fichas[i].getPosY() == y) {
          return i;
      }
  }
  return null;
}




//#region funciones recursivas de los 7 posibles casos ganadores
function recuCol(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  if (y < ALTO_TABLERO) {
      let indexCell = getFichaPorCoord(x, y);
      //checkeo si es el mismo jug
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFigureByCoord(x, y);
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();
          }
          return recuCol(x, y + TNO_FICHA, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}

function recuFilaIzq(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  if (x > ALTO_TABLERO) {
      //checkeo si es el mismo jug
      let indexCell = getFichaPorCoord(x, y);
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFichaPorCoord(x + (TNO_FICHA / 2), y + (TNO_FICHA / 2));
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();
          }
          return recuFilaIzq(x - TNO_FICHA, y, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}

function recuFilaDer(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
//  console.log(x,y,jugador,ganador);
  if (x <= ANCHO_TABLERO + (TNO_FICHA * COLUMNAS)) {
      //checkeo si es el mismo jug
      let indexCell = getFichaPorCoord(x, y);
//      console.log(indexCell);
//      console.log(fichas);
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFichaPorCoord(x + (TNO_FICHA / 2), y + (TNO_FICHA / 2));
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();
          }
          return recuFilaDer(x + TNO_FICHA, y, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}


function recuDiagDerArriba(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  if ((y >= height - (FILAS * TNO_FICHA)) && (x <= (width + (COLUMNAS * TNO_FICHA)))) {
      //checkeo si es el mismo jug
      let indexCell = getFichaPorCoord(x, y);
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFichaPorCoord(x + (TNO_FICHA / 2), y + (TNO_FICHA / 2));
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();;
          }
          return recuDiagDerArriba(x + TNO_FICHA, y - TNO_FICHA, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}

function recuDiagDerAbajo(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  if ((y < height) && (x <= (width + (COLUMNAS * TNO_FICHA)))) {
      //checkeo si es el mismo jug
      let indexCell = getFichaPorCoord(x, y);
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFichaPorCoord(x + (TNO_FICHA / 2), y + (TNO_FICHA / 2));
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();
          }
          return recuDiagDerAbajo(x + TNO_FICHA, y + TNO_FICHA, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}

function recuDiagIzqAbajo(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  if ((y < height) && (x > width)) {
      //checkeo si es el mismo jug
      let indexCell = getFichaPorCoord(x, y);
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFichaPorCoord(x + (TNO_FICHA / 2), y + (TNO_FICHA / 2));
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();
          }
          return recuDiagIzqAbajo(x - TNO_FICHA, y + TNO_FICHA, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}

function recuDiagIzqArriba(x, y, jugador, lastClicFicha, ganador) {
  //Estoy dentro del tablero?
  if ((y >= height - (COLUMNAS * TNO_FICHA) && (x > width))) {
      //checkeo si es el mismo jug
      let indexCell = getFichaPorCoord(x, y);
      if (fichas[indexCell].getPerteneceA() == lastClicFicha.getPerteneceA()) {
          if (ganador == true) {
              indexCell = getFichaPorCoord(x + (TNO_FICHA / 2), y + (TNO_FICHA / 2));
              fichas[indexCell].setResaltado(true);
              fichas[indexCell].getResaltadoEstilo();
          }
          return recuDiagIzqArriba(x - TNO_FICHA, y - TNO_FICHA, jugador, lastClicFicha, ganador) + 1;
      }
      return 0;
  }
  return 0;
}

//#endregion
*/