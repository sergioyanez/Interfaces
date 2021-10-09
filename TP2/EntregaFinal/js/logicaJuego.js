
function verificarGanador(){
   
   let matriz = tablero.devolverMatriz();
   let fichasJugadas = cantFichasJugadas(matriz);
   let ganador = null;
   //esEmpate(fichasJugadas);
   console.log(matriz);
   ganador = ganadorPorColumna(matriz);
   if (ganador != null){
    alert("gana: "+ganador);
   }
   else{
    ganador = ganadorPorFila(matriz);
    if (ganador != null){
      alert("gana: "+ganador);
     }
     else{
      ganador = ganadorPorDiagonal1(matriz);
      if (ganador != null){
        alert("gana: "+ganador);
       }
       
    /*   else{
        ganador = ganadorPorDiagonal1(matriz);
        if (ganador != null){
          alert("gana: "+ganador);
         }
       }
     }*/
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
  let ganador = null;
  let juegoGanado = false;
  let cant=0;
  while(columna < COLUMNAS && juegoGanado == false){
   // console.log("evaluando columna: "+columna);
      for(let i=0;i<matriz.length;i++){ //recorre la matriz d casilleros
          if(matriz[i].getCol()== columna && matriz[i].getFichaDeJugador()!=null){
          
               if (cant == 0){  //la primera ficha
                //    console.log("primera ficha jugador"+matriz[i].getFichaDeJugador())
                    jugador = matriz[i].getFichaDeJugador();
                    cant=1;
                //    console.log("cant "+cant);

                 }else if (matriz[i].getFichaDeJugador()==jugador &&  cant < NUMERO_GANADOR){ 
                 
                   cant++;
                //   console.log("otras fichas de jugador"+ jugador)
                //   console.log("cant "+cant);
                 }else if(matriz[i].getFichaDeJugador()!=jugador){
                  // console.log("nuevo jugador "+matriz[i].getFichaDeJugador());
                  cant = 1;
                  jugador = matriz[i].getFichaDeJugador();
                
               } 
               if (cant == NUMERO_GANADOR){
                 alert("fin de juego"+ jugador);
                juegoGanado = true;
                ganador = jugador;
                 
               }
              }        
                                  
          } 
          columna++; 
          cant = 0;                    
      }
              // console.log(matriz[i].getCol()+" "+matriz[i].getFila())             
    return ganador;  
           
  }

  function ganadorPorFila(matriz){
    let fila=0;
    let jugador = null;
    let ganador = null;
    let juegoGanado = false;
    let cant=0;
    while(fila < FILAS && juegoGanado == false){
      //console.log("evaluando fila: "+fila);
        for(let i=0;i<matriz.length;i++){ //recorre la matriz d casilleros
            if(matriz[i].getFila()== fila && matriz[i].getFichaDeJugador()!=null){
            
                 if (cant == 0){  //la primera ficha
                      console.log("primera ficha jugador"+matriz[i].getFichaDeJugador())
                      jugador = matriz[i].getFichaDeJugador();
                      cant=1;
                     console.log("cant "+cant);
  
                   }else if (matriz[i].getFichaDeJugador()==jugador &&  cant < NUMERO_GANADOR){ 
                   
                     cant++;
                     console.log("otras fichas de jugador"+ jugador)
                     console.log("cant "+cant);
                   }else if(matriz[i].getFichaDeJugador()!=jugador){
                     console.log("nuevo jugador "+matriz[i].getFichaDeJugador());
                    cant = 1;
                    jugador = matriz[i].getFichaDeJugador();
                  
                 } 
                 if (cant == NUMERO_GANADOR){
                   alert("fin de juego"+ jugador);
                  juegoGanado = true;
                  ganador = jugador;
                   
                 }
                }        
                                    
            } 
            fila++; 
            cant = 0;                    
        }
                // console.log(matriz[i].getCol()+" "+matriz[i].getFila())             
      return ganador;  
             
  }
  
  function ganadorPorDiagonal1(matriz){
    let columna=0;
    let fila = 0;
    let jugador = null;
    let ganador = null;
    let juegoGanado = false;
    let cant=0;
    while(fila < FILAS && columna < COLUMNAS && juegoGanado == false ){
      for(let i=0;i<matriz.length;i++){
        if(matriz[i]!= null && matriz[i+FILAS-1]!=null){
          if(matriz[i].getFichaDeJugador()==matriz[i+FILAS-1].getFichaDeJugador()){
            cant++;           
          }else{
            cant = 1;
          }
     
        if (cant == NUMERO_GANADOR){
        //  alert("fin de juego"+ jugador);
         juegoGanado = true;
         ganador = jugador;              
        }
      }
    }
      fila++;
      columna++;
      
    }
  }
}
