function verificarGanador(casi,index) {    //paso el casillero y el index en la matriz

  let matriz = tablero.devolverMatriz();
  let fichasJugadas = cantFichasJugadas(matriz);
  let ganador = null;
  let casillero = casi;
  //esEmpate(fichasJugadas);
//  console.log(matriz);
  ganador = ganadorPorColumna(matriz,casillero);
  if (ganador != null) {
    alert("gana: " + ganador);
  } else {
    ganador = ganadorPorFila(matriz,casillero);
    if (ganador != null) {
      alert("gana: " + ganador);
    } else {
      ganador = ganadorPorDiagDer(matriz,casillero,index);
      if (ganador != null) {
        alert("gana: " + ganador);
      }
    }
  }

  /*   else{
      ganador = ganadorPorDiagonal1(matriz);
      if (ganador != null){
        alert("gana: "+ganador);
       }
     }
   }*/


  return "verificando";

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
}

// function ganadorPorColumna(matriz) {
//   let columna = 0;
//   let jugador = null;
//   let ganador = null;
//   let juegoGanado = false;
//   let cant = 0;
//   while (columna < COLUMNAS && juegoGanado == false) {

//     for (let i = 0; i < matriz.length; i++) { //recorre la matriz d casilleros

//       if (matriz[i].getCol() == columna && matriz[i].getFichaDeJugador() != null) {
//         if (cant == 0) { //la primera ficha
//           jugador = matriz[i].getFichaDeJugador();
//           cant = 1;
//         } else if (matriz[i].getFichaDeJugador() == jugador && cant < NUMERO_GANADOR) {
//           cant++;

//         } else if (matriz[i].getFichaDeJugador() != jugador) {
//           cant = 1;
//           jugador = matriz[i].getFichaDeJugador();
//         }

//         if (cant == NUMERO_GANADOR) {
//           juegoGanado = true;
//           ganador = jugador;
//         }
//       }
//     }
//     columna++;
//     cant = 0;
//   }
//   return ganador;
// }
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


// function ganadorPorFila(matriz) {
//   let fila = 0;
//   let jugador = null;
//   let ganador = null;
//   let juegoGanado = false;
//   let cant = 0;
//   while (fila < FILAS && juegoGanado == false) {

//     for (let i = 0; i < matriz.length; i++) { //recorre la matriz d casilleros
//       if (matriz[i].getFila() == fila && matriz[i].getFichaDeJugador() != null) {
//         if (cant == 0) { //la primera ficha
//           jugador = matriz[i].getFichaDeJugador();
//           cant = 1;

//         } else if (matriz[i].getFichaDeJugador() == jugador && cant < NUMERO_GANADOR) {
//           cant++;

//         } else if (matriz[i].getFichaDeJugador() != jugador) {
//           cant = 1;
//           jugador = matriz[i].getFichaDeJugador();
//         }

//         if (cant == NUMERO_GANADOR) {
//           juegoGanado = true;
//           ganador = jugador;
//         }
//       }
//     }
//     fila++;
//     cant = 0;
//   }

//   return ganador;

// }

// function ganadorPorDiagonal1(matriz){
//   let columna=0;
//   let fila = 0;
//   let jugador = null;
//   let ganador = null;
//   let juegoGanado = false;
//   let cant=0;
//   while(fila < FILAS && columna < COLUMNAS && juegoGanado == false ){
//     for(let i=0;i<matriz.length;i++){
//       if(matriz[i]!= null && matriz[i+FILAS-1]!=null){
//         if(matriz[i].getFichaDeJugador()==matriz[i+FILAS-1].getFichaDeJugador()){
//           cant++;           
//         }else{
//           cant = 1;
//         }

//       if (cant == NUMERO_GANADOR){
//       //  alert("fin de juego"+ jugador);
//        juegoGanado = true;
//        ganador = jugador;              
//       }
//     }
//   }
//     fila++;
//     columna++;

//   }
// }

function ganadorPorDiagDer(matriz,casillero,index) {
  let columna = casillero.getCol();
  let fila = casillero.getFila();
  let jugador = casillero.getFichaDeJugador();
  let ganador = null;
  let juegoGanado = false;
  let cant = 1;
  let i = index+(FILAS-1);
  while (columna < COLUMNAS-1 && fila > 0 && juegoGanado == false) { //evaluo hacia arriba derecha
       
        
        if (matriz[i].getFichaDeJugador() != null ){
          console.log("evaluo "+i);
          if (matriz[i].getFichaDeJugador() == jugador && cant < NUMERO_GANADOR) {
            cant++;
            console.log("cantdiag "+cant)
   
           }else{
             cant = 1;
           }     
          if (cant == NUMERO_GANADOR) {
             juegoGanado = true;
             ganador = jugador;
           }
        }
        
            i+= (FILAS-1);
            columna++;
            fila--;
  }
  columna = casillero.getCol();
  fila = casillero.getFila();
  i = index-(FILAS-1);

  while (fila < FILAS-1 && columna > 0 && juegoGanado == false) { //evaluo hacia arriba derecha
       
        
    if (matriz[i].getFichaDeJugador() != null ){
      console.log("evaluo "+i);
      if (matriz[i].getFichaDeJugador() == jugador && cant < NUMERO_GANADOR) {
        cant++;
        console.log("cantdiag "+cant)

       }  else{
         cant = 1;
       }   
      if (cant == NUMERO_GANADOR) {
         juegoGanado = true;
         ganador = jugador;
       }
    }
    
        i-= (FILAS-1);
        columna--;
        fila++;
}

        
       
        
      return ganador;
    }
  
