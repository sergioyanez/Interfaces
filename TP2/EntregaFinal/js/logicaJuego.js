//Recorre el tablero en busca de un ganador
function verificarGanador(casi,index) {    //paso el casillero y el index en la matriz
  
  let matriz = tablero.devolverMatriz();
  let fichasJugadas = cantFichasJugadas(matriz);
  let ganador = null;
  let casillero = casi;
  if (esEmpate(fichasJugadas)){
    ganador = "EMPATE";
  }else{
    ganador = ganadorPorColumna(matriz,casillero);
    if (ganador == null) {
       ganador = ganadorPorFila(matriz,casillero);
      if (ganador == null) {
          ganador = ganadorPorDiagDer(matriz,casillero,index);
        if (ganador == null) {
             ganador = ganadorPorDiagIzq(matriz,casillero,index);
        
        }
      }
    }
  }

  return ganador;

}

// retorna la cantidad de fichas jugadas hasta el momento
function cantFichasJugadas(matriz) {
  let cantidad = 0;
  for (let i = 0; i < matriz.length; i++) {
    if (matriz[i].getOcupado() == true)
      cantidad++;
  }
  return cantidad;
}

//retorna true si ya se jugaron todas las fichas
function esEmpate(fichasJugadas) {
  if (fichasJugadas == CANT_FICHAS) {
    return true;
  }
  return false;
}
//Verifica si el jugador que jugó la ficha logró ganar en la columna tirada
function ganadorPorColumna(matriz,casillero) {
  let columna = casillero.getCol();
  let jugador = casillero.getFichaDeJugador();
  let ganador = null;
  let juegoGanado = false;
  let cant = 1;
  let fila = casillero.getFila();
  if (NUMERO_GANADOR-fila > 1){
    fila++;
    while (fila < FILAS && juegoGanado == false) {
      for (let i = 0; i< matriz.length; i++){
           if(matriz[i].getCol() == columna && matriz[i].getFila()== fila){
                 if (matriz[i].getFichaDeJugador() == jugador && cant < NUMERO_GANADOR) {
                       cant++;
       
           }else{
             cant=0;
           }
            if (cant == NUMERO_GANADOR) {
                 juegoGanado = true;
                 ganador = jugador;
               }
           }
   
    }
    fila++;
    
      
  }

  }
     
  return ganador;
}
//Verifica si el jugador que jugó la ficha logró ganar en la fila tirada
function ganadorPorFila(matriz,casillero) {
  let columna = 0;
  let jugador = casillero.getFichaDeJugador();
  let ganador = null;
  let juegoGanado = false;
  let cant = 0;
  let fila = casillero.getFila();
  
    while (columna < COLUMNAS && juegoGanado == false) {
      for (let i = 0; i< matriz.length; i++){
           if(matriz[i].getCol() == columna && matriz[i].getFila()== fila){
                 if (matriz[i].getFichaDeJugador() == jugador && cant < NUMERO_GANADOR) {
                 cant++;
            }else{
              cant = 0;
            }
            if (cant == NUMERO_GANADOR) {
                 juegoGanado = true;
                 ganador = jugador;
               }
           }
   
    }
    columna++;

  }
     
  return ganador;
}

//Verifica si el jugador que jugó logró ganar en la diagonal a derecha en referencia a la ficha tirada
function ganadorPorDiagDer(matriz,casillero,index) {
  let columna = casillero.getCol();
  let fila = casillero.getFila();
  let jugador = casillero.getFichaDeJugador();
  let ganador = null;
  let juegoGanado = false;
  let cant = 1;
  let i = index+(FILAS-1);
  
  while (columna < COLUMNAS-1 && fila > 0 && juegoGanado == false) { //evaluo hacia arriba derecha
        if (matriz[i].getFichaDeJugador() != null && matriz[i].getFichaDeJugador() == jugador){
          if (cant < NUMERO_GANADOR) {
            cant++;
           }              
          if (cant == NUMERO_GANADOR) {
             juegoGanado = true;
             ganador = jugador;
           }
        }else{
          fila = 0;
        }
            i+= (FILAS-1);
            columna++;
            fila--;
  }
  columna = casillero.getCol();
  fila = casillero.getFila();
  i = index-(FILAS-1);

  while (fila < FILAS-1 && columna > 0 && juegoGanado == false) { //evaluo hacia arriba derecha
    if (matriz[i].getFichaDeJugador() != null && matriz[i].getFichaDeJugador() == jugador){
      if (cant < NUMERO_GANADOR) {
        cant++;
       }
      if (cant == NUMERO_GANADOR) {
         juegoGanado = true;
         ganador = jugador;
       }
    }else{
      columna = 0;
    }
    
        i-= (FILAS-1);
        columna--;
        fila++;
}
      return ganador;
    }

  //Verifica si el jugador que jugó logró ganar en la diagonal a izquierda en referencia a la ficha tirada
    function ganadorPorDiagIzq(matriz,casillero,index) {
      let columna = casillero.getCol();
      let fila = casillero.getFila();
      let jugador = casillero.getFichaDeJugador();
      let ganador = null;
      let juegoGanado = false;
      let cant = 1;
      let i = index-(COLUMNAS);
      
      while (columna > 0 && fila > 0 && juegoGanado == false) { 
            if (matriz[i].getFichaDeJugador() != null && matriz[i].getFichaDeJugador() == jugador ){
              if (cant < NUMERO_GANADOR) {
                cant++;
               }
              if (cant == NUMERO_GANADOR) {
                 juegoGanado = true;
                 ganador = jugador;
               }
            }
            else{
              columna = 0;
            }
                i-= COLUMNAS;
                columna--;
                fila--;
      }
      columna = casillero.getCol();
      fila = casillero.getFila();
      i = index+COLUMNAS;
    
      while (fila < FILAS-1 && columna < COLUMNAS-1 && juegoGanado == false) { 
        if (matriz[i].getFichaDeJugador() != null && matriz[i].getFichaDeJugador() == jugador){
          if (cant < NUMERO_GANADOR) {
            cant++;
           }
          if (cant == NUMERO_GANADOR) {
             juegoGanado = true;
             ganador = jugador;
           }
        }
        else{
          fila = FILAS-1;
        }       
            i+= COLUMNAS;
            columna++;
            fila++;
    }
          return ganador;
        }
