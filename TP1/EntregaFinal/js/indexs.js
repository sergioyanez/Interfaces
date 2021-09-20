"use strict";

document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let rect=canvas.getBoundingClientRect(); // devuelve left y top con respecto a la pantalla donde está el canvas
  let x = 0, y = 0, dibujar = false;
  let width = canvas.width;
  let height = canvas.height;
  let imageData, imageData2;
  let grayPixel;
  let r;
  let g;
  let b;
  let a = 255;
  let r1,r2,g1,g2,b1,b2;
  let borrar = false;
  let valueSat=0;
  let copia,atras;
    

  cleanCanvas();
 // Botones de filtros
  let btn1 = document.getElementById("flt-sepia");
  btn1.addEventListener("click", sepiaFilter);
  let btn2 = document.getElementById("flt-negative");
  btn2.addEventListener("click", negativeFilter);
  let btn3 = document.getElementById("flt-greyScale");
  btn3.addEventListener("click", greyScale);
  let btn4 = document.getElementById("flt-binarie");
  btn4.addEventListener("click", binarizationFilter);
  let btn5 = document.getElementById("lessBright");
  btn5.addEventListener("click", lessBright);
  let btn6 = document.getElementById("moreBright");
  btn6.addEventListener("click", moreBright);
  let btn11 = document.getElementById("flt-blur");
  btn11.addEventListener("click", blurFilter);
  let btn12 = document.getElementById("flt-sobel");
  btn12.addEventListener("click", sobelFilter);
  let btn13 = document.getElementById("flt-sobel-horizontal");
  btn13.addEventListener("click", sobelHorizontalFilter);
  let btn19 = document.getElementById("flt-sobel-vertical");
  btn19.addEventListener("click", sobelVerticalFilter);

  // Botones de administracion de imagen
  let btn7 = document.getElementById("btnClean");
  btn7.addEventListener("click", cleanCanvas);
  let btn8 = document.getElementById("addImage");
  btn8.addEventListener("change", addImageCanvas);
  let btn9 = document.getElementById("download");
  btn9.addEventListener("click", downloadImageCanvas);
  let btn17 = document.getElementById("flt-origin");
  btn17.addEventListener("click",original);
  let btn18 = document.getElementById("deshacer");
  btn18.addEventListener("click",deshace);

  //Botones de Barra de herramientas paint

  let btn10= document.getElementById("btnPencil");
 btn10.addEventListener("click", pencilON);
 let btn14= document.getElementById("btnGoma");
 btn14.addEventListener("click", eraser);
 let btn15=document.getElementById("lessSaturation");
 btn15.addEventListener("click",desSaturar);
 let btn16=document.getElementById("moreSaturation");
 btn16.addEventListener("click",masSaturar);

 
 // Vuelve a cargar en el canvas la matriz de la imagen anterior a aplicar modificaciones
 function deshace(){
  ctx.putImageData(atras, 0, 0);
 }
 
 //Carga la matriz de la imagen original subida desde disco
 function original(){
  if (copia != null){
    ctx.putImageData(copia, 0, 0);
  }
  
 }
  
 // resta saturación a la imagen actual
 function desSaturar(){
    valueSat = -0.1;
    saturar();
 }

 // suma saturación a la imagen actual
 function masSaturar(){
  valueSat = 0.1;
  saturar();
}

// trae la imagen actual, transforma los valores rgb a hsl, suma o resta la saturación deseada
// vuelve a transformat a rgb y setea los pixeles con los nuevos valores.
//por último carga la matriz en el contexto del canva.
function saturar(){
  
  imageData = ctx.getImageData(0, 0, width, height);
 
  for (let x = 0; x < imageData.width; x++) {
          for (let y = 0; y < imageData.height; y++) {
                  let hsl = rgbToHsl(imageData, x, y);
                  hsl[1] = hsl[1] + valueSat;
                  let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
                  setPixel(imageData, x, y, rgb[0], rgb[1], rgb[2], 255);
          }
  }
  ctx.putImageData(imageData, 0, 0);
}
//transforma los valores rgb a hsl
function rgbToHsl(imageData, x, y) {
  let index = (x + y * imageData.width) * 4;
  let r = imageData.data[index+0];
  let g = imageData.data[index+1];
  let b = imageData.data[index+2];
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if (max == min) {
          h = s = 0; 
  } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
  }
  return [ h, s, l ];
}

//transforma los valores hsl a rgb
function hslToRgb(h, s, l) {
  var r, g, b;
  if (s == 0) {
          r = g = b = l; 
  } else {
          function hue2rgb(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
          }
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
  }
  return [ r * 255, g * 255, b * 255 ];
}
  
//Guarda la matriz actual para uso en funcion deshacer
//activa la funcionalidad pencil para que comience a dibujar el lápiz.
 function pencilON(){
  atras = ctx.getImageData(0, 0, width, height);
   pencil();
 }

//Guarda la matriz actual para uso en funcion deshacer, la variable borrar se vuelve true
// para que luego el color del lapiz sea blanco
//activa la funcionalidad eraser para que comience a borra la goma.
 function eraser(){
  atras = ctx.getImageData(0, 0, width, height);
   borrar = true;
   pencil();
 }
 
 // funcionalidad utilizada para el lápiz y para la goma
 //se detectan tres eventos: mousedown(cuando se baja el lápiz "click")
 // mousemove(cuando se está moviendo el mouse presionado) y mouseUp (cuando se suelta el click del mouse)
  function pencil(){

  canvas.addEventListener("mousedown", function(e){
    x=e.clientX - rect.left;   //posicion en x donde hizo clic - posicion con respecto al canvas
    y=e.clientY - rect.top;
    dibujar=true;

  });
  canvas.addEventListener("mousemove", function(e){
   if(dibujar===true){
     draw(x,y,e.clientX - rect.left,e.clientY - rect.top); //paso el punto inicial y donde estoy en este momento
     x = e.clientX - rect.left;  //nuevo punto inicial se vuelve el punto final
     y = e.clientY - rect.top;
   }
  });
 
  canvas.addEventListener("mouseup", function(e){
    if(dibujar===true){
     draw(x,y,e.clientX - rect.left,e.clientY - rect.top);
     x=0;      //reinicio variables
     y=0;
     dibujar=false;
     borrar=false;
    }
  });

// funcion que permite dibujar según el recorrido del pencil
  function draw(x1,y1,x2,y2){
    ctx.beginPath();   //comienzo una nueva ruta
    ctx.lineCap = "round";
    if(borrar === true){
      ctx.strokeStyle="#FFFFFF";   // en el caso de la goma, pinta blanco

    }else{
      ctx.strokeStyle = document.getElementById("setColor").value;  //toma el valor del input
    }
    
    ctx.lineWidth=document.getElementById("setGrosor").value;
    ctx.moveTo(x1,y1);   //muevo el lápiz a las coordenadas iniciales
    ctx.lineTo(x2,y2);   //agrega un punto y crea una línea HASTA ese punto DESDE el último punto, sin dibujar
    ctx.stroke();     //dibuja la linea definida en moveTo y LineTo
    ctx.closePath();  //termina el camino
  }
 };
  
   // descarga la imagen actual del contexto del canva.
  function downloadImageCanvas(){
    let dnld = document.getElementById("imgDownload");
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // devuelve la matriz
    dnld.setAttribute("href", image);
   }
  
  // agrega una image desde disco a Canvas
  function addImageCanvas(e) {
    cleanCanvas();        //se limpia canvas
    let urlImagen = e.target.files[0];
    let reader = new FileReader();
    let image = new Image();
    image.title = urlImagen.name;
    reader.onload = function (e) {
      image.src = e.target.result;
      image.onload = function () {

        let imgWidth = image.width;
        let imgHeight = image.height;
        
        if(imgWidth < imgHeight){ // ajusta,para mantener el aspecto de la imagen original, si la imagen tiene más alto que ancho
            let proportion = (height * 100) / imgHeight;
            imgWidth = imgWidth * (proportion/100);
            imgHeight = imgHeight * (proportion/100);
        } else if (imgWidth > imgHeight){  // ajusta,para mantener el aspecto de la imagen original, si la imagen tiene más ancho que alto
            let proportion = (width * 100) / imgWidth;
            imgWidth = imgWidth * (proportion/100);
            imgHeight = imgHeight * (proportion/100);
        } else { // ajusta,para mantener el aspecto de la imagen original, si la imagen tiene mismo alto que ancho
            let proportionWidth = (width * 100) / imgWidth;
            let proportionHeight = (height * 100) / imgHeight;
            imgWidth = imgWidth * (proportionWidth/100);
            imgHeight = imgHeight * (proportionHeight/100);
        }

        ctx.drawImage(image, 0, 0, imgWidth, imgHeight);
        copia = ctx.getImageData(0, 0, width, height);
        atras = copia;
      };
    };
    reader.readAsDataURL(urlImagen);
    
  }
  //limpia canvas, obteniendo una lienzo en blanco para comenzar nuevamente
  function cleanCanvas() {    
   
   imageData = ctx.getImageData(0, 0, width, height);   
   atras = ctx.getImageData(0, 0, width, height);   //se guarda imageData para la funcionalidad deshacer
    for (let x = 0; x < width; x++) {         //Se colocan en blanco todos los pixeles del canva
      for (let y = 0; y < height; y++) {
        r = 255;
        g = 255;
        b = 255;
        setPixel(imageData, x, y, r, g, b, a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  //Agrega más brillo a la imagen actual en canva
  function moreBright() {           
    imageData = ctx.getImageData(0, 0, width, height);
    atras = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {  //trae el Rojo, Verde y Azul del pixel en la ubicacion x,y 
        r = getRed(imageData, x, y);      
        g = getGreen(imageData, x, y);    
        b = getBlue(imageData, x, y);
        setPixelMoreBright(imageData, x, y, r, g, b, a); //llama a la funcion para agregar brillo    
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  //Quita brillo a la imagen actual
  function lessBright() {
    imageData = ctx.getImageData(0, 0, width, height);
    atras = ctx.getImageData(0, 0, width, height);
  
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r = getRed(imageData, x, y);
        g = getGreen(imageData, x, y);
        b = getBlue(imageData, x, y);
        setPixeLessBright(imageData, x, y, r, g, b, a); //llama a la funcion para quitar brillo 
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function sepiaFilter() {
    imageData = ctx.getImageData(0, 0, width, height);
    atras = ctx.getImageData(0, 0, width, height);
   
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r =
          0.898 * getRed(imageData, x, y) +
          0.769 * getGreen(imageData, x, y) +
          0.189 * getBlue(imageData, x, y);
        if (r > 255) {
          r = 255;
        }
        g =
          0.649 * getRed(imageData, x, y) +
          0.686 * getGreen(imageData, x, y) +
          0.168 * getBlue(imageData, x, y);
        if (g > 255) {
          g = 255;
        }
        b =
          0.349 * getRed(imageData, x, y) +
          0.686 * getGreen(imageData, x, y) +
          0.168 * getBlue(imageData, x, y);
        if (b > 255) {
          b = 255;
        }
        setPixel(imageData, x, y, r, g, b, a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  // Genera una imagen, con filtro negativo de la actual
  function negativeFilter() {
    imageData = ctx.getImageData(0, 0, width, height);
    atras = ctx.getImageData(0, 0, width, height);
  
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r = getRed(imageData, x, y);
        g = getGreen(imageData, x, y);
        b = getBlue(imageData, x, y);
        setPixel(imageData, x, y, 255 - r, 255 - g, 255 - b, a);  //Se setean los pixeles con los colores complementarios
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  //Convierte la imagen actual en escala de grises (RGB deben ser iguales)
  function greyScale() {
    imageData = ctx.getImageData(0, 0, width, height);
    atras = ctx.getImageData(0, 0, width, height);
    
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r = getRed(imageData, x, y);
        g = getGreen(imageData, x, y);
        b = getBlue(imageData, x, y);
        grayPixel = generateAverageGray(r, g, b);  //Se asigna el valor promedio para todos los colores
        setPixel(imageData, x, y, grayPixel, grayPixel, grayPixel, a);  //se setea el pixele 
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function binarizationFilter() {
    let pixel;
    imageData = ctx.getImageData(0, 0, width, height);
    atras = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        pixel =
          getRed(imageData, x, y) +
          getGreen(imageData, x, y) +
          getBlue(imageData, x, y);
        //uso 381 ((255 + 255 + 255) / 2) como valor frontera entre Blanco y Negro.
        if (pixel > 381) {
          setPixel(imageData, x, y, 255, 255, 255, a);
        } else {
          setPixel(imageData, x, y, 0, 0, 0, a);
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
    
  }
  //Retorna el valor promedio de R,G,B para lograr una escala de grises
  function generateAverageGray(r, g, b) {
    let gray = (r + g + b) / 3;
    return gray;
  }

  function blurFilter() {
    imageData = ctx.getImageData(0, 0, width, height);
    atras = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r = (getRed(imageData, x, y)+getRed(imageData, x-1, y)+getRed(imageData, x+1, y)+getRed(imageData, x-1, y+1)+getRed(imageData, x-1, y-1)+getRed(imageData, x, y+1)+getRed(imageData, x, y-1)+getRed(imageData, x+1, y+1)+getRed(imageData, x+1, y-1))/9;
        g = (getGreen(imageData, x, y)+getGreen(imageData, x-1, y)+getGreen(imageData, x+1, y)+getGreen(imageData, x-1, y+1)+getGreen(imageData, x-1, y-1)+getGreen(imageData, x, y+1)+getGreen(imageData, x, y-1)+getGreen(imageData, x+1, y+1)+getGreen(imageData, x+1, y-1))/9;
        b =  (getBlue(imageData, x, y)+getBlue(imageData, x-1, y)+getBlue(imageData, x+1, y)+getBlue(imageData, x-1, y+1)+getBlue(imageData, x-1, y-1)+getBlue(imageData, x, y+1)+getBlue(imageData, x, y-1)+getBlue(imageData, x+1, y+1)+getBlue(imageData, x+1, y-1))/9;
   
        setPixel(imageData, x, y, r,g,b, a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function sobelFilter(){
    imageData = ctx.getImageData(0, 0, width, height);
    imageData2 = ctx.getImageData(0, 0, width, height); 
    atras = ctx.getImageData(0, 0, width, height);   
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r2 = getRed(imageData, x-1, y)*(-2)+getRed(imageData, x+1, y)*(2)+getRed(imageData, x-1, y+1)*(-1)+getRed(imageData, x-1, y-1)*(-1)+getRed(imageData, x, y+1)*(0)+getRed(imageData, x, y-1)*(0)+getRed(imageData, x+1, y+1)*(1)+getRed(imageData, x+1, y-1)*(1);
        g2 =getGreen(imageData, x-1, y)*(-2)+getGreen(imageData, x+1, y)*(2)+getGreen(imageData, x-1, y+1)*(-1)+getGreen(imageData, x-1, y-1)*(-1)+getGreen(imageData, x, y+1)*(0)+getGreen(imageData, x, y-1)*(0)+getGreen(imageData, x+1, y+1)*(1)+getGreen(imageData, x+1, y-1)*(1);
        b2 = getBlue(imageData, x-1, y)*(-2)+getBlue(imageData, x+1, y)*(2)+getBlue(imageData, x-1, y+1)*(-1)+getBlue(imageData, x-1, y-1)*(-1)+getBlue(imageData, x, y+1)*(0)+getBlue(imageData, x, y-1)*(0)+getBlue(imageData, x+1, y+1)*(1)+getBlue(imageData, x+1, y-1)*(1);
      
        r1 = getRed(imageData, x-1, y+1)*(1)+getRed(imageData, x-1, y-1)*(-1)+getRed(imageData, x, y+1)*(2)+getRed(imageData, x, y-1)*(-2)+getRed(imageData, x+1, y+1)*(1)+getRed(imageData, x+1, y-1)*(-1);
        g1 =getGreen(imageData, x-1, y+1)*(1)+getGreen(imageData, x-1, y-1)*(-1)+getGreen(imageData, x, y+1)*(2)+getGreen(imageData, x, y-1)*(-2)+getGreen(imageData, x+1, y+1)*(1)+getGreen(imageData, x+1, y-1)*(-1);
        b1 = getBlue(imageData, x-1, y+1)*(1)+getBlue(imageData, x-1, y-1)*(-1)+getBlue(imageData, x, y+1)*(2)+getBlue(imageData, x, y-1)*(-2)+getBlue(imageData, x+1, y+1)*(1)+getBlue(imageData, x+1, y-1)*(-1);
        r= Math.sqrt(Math.pow(r1,2)+Math.pow(r2,2));
        g= Math.sqrt(Math.pow(g1,2)+Math.pow(g2,2));
        b= Math.sqrt(Math.pow(b1,2)+Math.pow(b2,2));
        setPixel(imageData2, x, y, r,g,b, a);
      }
    }
    ctx.putImageData(imageData2, 0, 0);
  }

  function sobelHorizontalFilter(){
    imageData = ctx.getImageData(0, 0, width, height);
    imageData2 = ctx.getImageData(0, 0, width, height); 
    atras = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r = getRed(imageData, x-1, y+1)*(1)+getRed(imageData, x-1, y-1)*(-1)+getRed(imageData, x, y+1)*(2)+getRed(imageData, x, y-1)*(-2)+getRed(imageData, x+1, y+1)*(1)+getRed(imageData, x+1, y-1)*(-1);
        g =getGreen(imageData, x-1, y+1)*(1)+getGreen(imageData, x-1, y-1)*(-1)+getGreen(imageData, x, y+1)*(2)+getGreen(imageData, x, y-1)*(-2)+getGreen(imageData, x+1, y+1)*(1)+getGreen(imageData, x+1, y-1)*(-1);
        b = getBlue(imageData, x-1, y+1)*(1)+getBlue(imageData, x-1, y-1)*(-1)+getBlue(imageData, x, y+1)*(2)+getBlue(imageData, x, y-1)*(-2)+getBlue(imageData, x+1, y+1)*(1)+getBlue(imageData, x+1, y-1)*(-1);
        setPixel(imageData2, x, y, r,g,b, a);
      }
    }
    ctx.putImageData(imageData2, 0, 0);
  }
  
  function sobelVerticalFilter(){
    imageData = ctx.getImageData(0, 0, width, height);
    imageData2 = ctx.getImageData(0, 0, width, height); 
    atras = ctx.getImageData(0, 0, width, height);   
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r = getRed(imageData, x-1, y)*(-2)+getRed(imageData, x+1, y)*(2)+getRed(imageData, x-1, y+1)*(-1)+getRed(imageData, x-1, y-1)*(-1)+getRed(imageData, x, y+1)*(0)+getRed(imageData, x, y-1)*(0)+getRed(imageData, x+1, y+1)*(1)+getRed(imageData, x+1, y-1)*(1);
        g =getGreen(imageData, x-1, y)*(-2)+getGreen(imageData, x+1, y)*(2)+getGreen(imageData, x-1, y+1)*(-1)+getGreen(imageData, x-1, y-1)*(-1)+getGreen(imageData, x, y+1)*(0)+getGreen(imageData, x, y-1)*(0)+getGreen(imageData, x+1, y+1)*(1)+getGreen(imageData, x+1, y-1)*(1);
        b = getBlue(imageData, x-1, y)*(-2)+getBlue(imageData, x+1, y)*(2)+getBlue(imageData, x-1, y+1)*(-1)+getBlue(imageData, x-1, y-1)*(-1)+getBlue(imageData, x, y+1)*(0)+getBlue(imageData, x, y-1)*(0)+getBlue(imageData, x+1, y+1)*(1)+getBlue(imageData, x+1, y-1)*(1);
        setPixel(imageData2, x, y, r,g,b, a);
      }
    }
    ctx.putImageData(imageData2, 0, 0);
  }

  // Setea el pixel en la posición x,y de la imagen, con los valores pasados por parámetro
  function setPixel(image, x, y, r, g, b, a) {
    let index = (x + y * image.width) * 4;
    image.data[index] = r;
    image.data[index + 1] = g;
    image.data[index + 2] = b;
    image.data[index + 3] = a;
  }

  //Agrega brillo al pixel en la posición x,y
  function setPixelMoreBright(imageData, x, y, r, g, b, a) { 
    let index = (x + y * imageData.width) * 4;   //calcula el index para poder recorres el arreglo imageData
    
    imageData.data[index + 0] = r + 10;   //suma 10 en cada color para aumentar el brillo
    imageData.data[index + 1] = g + 10;
    imageData.data[index + 2] = b + 10;
    imageData.data[index + 3] = a;   //la transparencia queda igual
  }

  //Quita brillo al pixel en la posición x,y
  function setPixeLessBright(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;

    imageData.data[index + 3] = a;
    imageData.data[index + 0] = r - 10;
    imageData.data[index + 1] = g - 10;
    imageData.data[index + 2] = b - 10;
  }

  //Devuelve el valor de Rojo en la posición x,y de la imagen
  function getRed(image, x, y) {
    let index = (x + y * image.width) * 4;
    return image.data[index];
  }
  //Devuelve el valor de Verde en la posición x,y de la imagen
  function getGreen(image, x, y) {
    let index = (x + y * image.width) * 4;
    return image.data[index + 1];
  }
  //Devuelve el valor de Azul en la posición x,y de la imagen
  function getBlue(image, x, y) {
    let index = (x + y * image.width) * 4;
    return image.data[index + 2];
  }
});
