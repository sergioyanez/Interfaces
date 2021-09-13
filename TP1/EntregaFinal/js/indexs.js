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
  let btn14 = document.getElementById("flt-sobel-vertical");
  btn14.addEventListener("click", sobelVerticalFilter);

  // Botones de administracion de imagen
  let btn7 = document.getElementById("btnClean");
  btn7.addEventListener("click", cleanCanvas);
  let btn8 = document.getElementById("addImage");
  btn8.addEventListener("change", addImageCanvas);
  let btn9 = document.getElementById("download");
  btn9.addEventListener("click", downloadImageCanvas);

  //Botones de Barra de herramientas paint

  let btn10= document.getElementById("btnPencil");
 btn10.addEventListener("click",function(e){

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
    }
  });

  function draw(x1,y1,x2,y2){
    ctx.beginPath();   //comienzo una nueva ruta
    ctx.lineCap = "round";
    ctx.strokeStyle = document.getElementById("setColor").value;
    ctx.lineWidth=document.getElementById("setGrosor").value;
    ctx.moveTo(x1,y1);   //muevo el lápiz a las coordenadas iniciales
    ctx.lineTo(x2,y2);   //dibujo la linea
    ctx.stroke();    
    ctx.closePath();
  }
 });
  
   

//  canvas.addEventListener("mouseout", finish);
 




  function downloadImageCanvas(){
    let dnld = document.getElementById("imgDownload");
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    dnld.setAttribute("href", image);
   }
  
  
  function addImageCanvas(e) {
    cleanCanvas();
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
      };
    };
    reader.readAsDataURL(urlImagen);
  }

  function cleanCanvas() {
   // ctx.clearRect(0, 0, width, height);
   imageData = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r = 255;
        g = 255;
        b = 255;
        setPixel(imageData, x, y, r, g, b, a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function downloadCanvas(){
   
    let dnld = document.getElementById("download");
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    dnld.setAttribute("href", image);

  }

  function moreBright() {
    imageData = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r = getRed(imageData, x, y);
        g = getGreen(imageData, x, y);
        b = getBlue(imageData, x, y);
        setPixelMoreBright(imageData, x, y, r, g, b, a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function lessBright() {
    imageData = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r = getRed(imageData, x, y);
        g = getGreen(imageData, x, y);
        b = getBlue(imageData, x, y);
        setPixeLessBright(imageData, x, y, r, g, b, a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function sepiaFilter() {
    imageData = ctx.getImageData(0, 0, width, height);
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

  function negativeFilter() {
    imageData = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r = getRed(imageData, x, y);
        g = getGreen(imageData, x, y);
        b = getBlue(imageData, x, y);
        setPixel(imageData, x, y, 255 - r, 255 - g, 255 - b, a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function greyScale() {
    imageData = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        r = getRed(imageData, x, y);
        g = getGreen(imageData, x, y);
        b = getBlue(imageData, x, y);
        grayPixel = generateAverageGray(r, g, b);
        setPixel(imageData, x, y, grayPixel, grayPixel, grayPixel, a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function binarizationFilter() {
    let pixel;
    imageData = ctx.getImageData(0, 0, width, height);
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

  function generateAverageGray(r, g, b) {
    let gray = (r + g + b) / 3;
    return gray;
  }

  function blurFilter() {
    imageData = ctx.getImageData(0, 0, width, height);
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

  function setPixel(image, x, y, r, g, b, a) {
    let index = (x + y * image.width) * 4;
    image.data[index] = r;
    image.data[index + 1] = g;
    image.data[index + 2] = b;
    image.data[index + 3] = a;
  }

  function setPixelMoreBright(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;

    imageData.data[index + 3] = a;
    imageData.data[index + 0] = r + 10;
    imageData.data[index + 1] = g + 10;
    imageData.data[index + 2] = b + 10;
  }

  function setPixeLessBright(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;

    imageData.data[index + 3] = a;
    imageData.data[index + 0] = r - 10;
    imageData.data[index + 1] = g - 10;
    imageData.data[index + 2] = b - 10;
  }

  function getRed(image, x, y) {
    let index = (x + y * image.width) * 4;
    return image.data[index];
  }
  function getGreen(image, x, y) {
    let index = (x + y * image.width) * 4;
    return image.data[index + 1];
  }
  function getBlue(image, x, y) {
    let index = (x + y * image.width) * 4;
    return image.data[index + 2];
  }
});
