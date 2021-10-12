function verificarGanador(casi,index) {    //paso el casillero y el index en la matriz

  let matriz = tablero.devolverMatriz();
  let fichasJugadas = cantFichasJugadas(matriz);
  let ganador = null;
  let casillero = casi;
  if (esEmpate(fichasJugadas)){
    ganador = "EMPATE";
  }else{
    ganador = ganadorPorColumna(matriz,casillero);
    if (ganador != null) {
     
    } else {
      ganador = ganadorPorFila(matriz,casillero);
      if (ganador != null) {
      
      } else {
        ganador = ganadorPorDiagDer(matriz,casillero,index);
        if (ganador != null) {
         
        }else{
          ganador = ganadorPorDiagIzq(matriz,casillero,index);
        if (ganador != null){
         
         }
        }
      }
    }
  }


  return ganador;

}


function cantFichasJugadas(matriz) {
  let cantidad = 0;
  for (let i = 0; i < matriz.length; i++) {

    if (matriz[i].getOcupado() == true)
      cantidad++;
  }
  return cantidad;
}

function esEmpate(fichasJugadas) {

  if (fichasJugadas == CANT_FICHAS) {

    return true;
  }
  return false;
}

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


function ganadorPorDiagDer(matriz,casillero,index) {
  let columna = casillero.getCol();
  let fila = casillero.getFila();
  let jugador = casillero.getFichaDeJugador();
  let ganador = null;
  let juegoGanado = false;
  let cant = 1;
  let i = index+(FILAS-1);
  console.log("index"+index);
  while (columna < COLUMNAS-1 && fila > 0 && juegoGanado == false) { //evaluo hacia arriba derecha
             
        if (matriz[i].getFichaDeJugador() != null && matriz[i].getFichaDeJugador() == jugador){
           console.log("evaluo "+i);
          if (cant < NUMERO_GANADOR) {
            cant++;
            console.log("cantdiag "+cant);
   
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
      console.log("evaluo "+i);
      if (cant < NUMERO_GANADOR) {
        cant++;
       console.log("cantdiag "+cant)

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
  
    function ganadorPorDiagIzq(matriz,casillero,index) {
      let columna = casillero.getCol();
      let fila = casillero.getFila();
      let jugador = casillero.getFichaDeJugador();
      let ganador = null;
      let juegoGanado = false;
      let cant = 1;
      let i = index-(COLUMNAS);
      
      while (columna > 0 && fila > 0 && juegoGanado == false) { //evaluo hacia arriba derecha
           
            
            if (matriz[i].getFichaDeJugador() != null && matriz[i].getFichaDeJugador() == jugador ){
              console.log("evaluo "+i);
              if (cant < NUMERO_GANADOR) {
                cant++;
               console.log("cantdiag "+cant)
       
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
             //   console.log("i,col, fila ",i,columna,fila);
      }
      columna = casillero.getCol();
      fila = casillero.getFila();
      i = index+COLUMNAS;
    
      while (fila < FILAS-1 && columna < COLUMNAS-1 && juegoGanado == false) { //evaluo hacia arriba derecha
           
            
        if (matriz[i].getFichaDeJugador() != null && matriz[i].getFichaDeJugador() == jugador){
          console.log("evaluo "+i);
          if (cant < NUMERO_GANADOR) {
            cant++;
            console.log("cantdiag "+cant)
    
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
