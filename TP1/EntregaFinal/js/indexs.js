'use strict';
document.addEventListener("DOMContentLoaded", function(){

    function imagenCanvas(){
        let imageData;
        let grayPixel;
        let r ;        
        let g ;
        let b ;
        let a = 255;
  
        let btn = document.getElementById("flt-original");
            btn.addEventListener('click', originalImage)
        let btn1 = document.getElementById("flt-sepia");
            btn1.addEventListener('click', sepiaFilter)
        let btn2 = document.getElementById("flt-negative");
            btn2.addEventListener('click', negativeFilter)
        let btn3 = document.getElementById("flt-greyScale");
            btn3.addEventListener('click', greyScale)
        let btn4 = document.getElementById("flt-binarie");
            btn4.addEventListener('click', binarizationFilter)
        let btn5 = document.getElementById("lessBright");
            btn5.addEventListener('click',lessBright)
        let btn6 = document.getElementById("moreBright");
            btn6.addEventListener('click',moreBright)

        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d"); 
        let width = canvas.width;
        let height = canvas.height; 
        let image1 = new Image();
        image1.src = "images/leon.jpg";
        image1.onload = () =>{
          myDrawImageMethod(image1);
        }
        function myDrawImageMethod(image){
          ctx.drawImage(image1,0,0,width, height);
        }

        function originalImage(){
          image1.src = "images/leon.jpg";
          image1.onload = () =>{
            myDrawImageMethod(image1);
          }
          function myDrawImageMethod(image){
            ctx.drawImage(image1,0,0,width, height);
          }
        }

        function moreBright(){         
          imageData = ctx.getImageData(0,0, width, height);       
          for (let x = 0; x < width; x++) {
                  for (let y = 0; y < height; y++) {                                              
                    r = getRed(imageData,x,y);        
                    g = getGreen(imageData,x,y);
                    b = getBlue(imageData,x,y); 
                    setPixelMoreBright(imageData,x,y,r,g,b,a)
                  }        
                }
                ctx.putImageData(imageData,0,0);
        }

        function lessBright(){
          imageData = ctx.getImageData(0,0, width, height); 
          for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {                                              
              r = getRed(imageData,x,y);        
              g = getGreen(imageData,x,y);
              b = getBlue(imageData,x,y); 
              setPixeLessBright(imageData,x,y,r,g,b,a)
            }        
          }
          ctx.putImageData(imageData,0,0);
        }
  
        function sepiaFilter(){
            image1.src = "images/leon.jpg";
            image1.onload = function(){
              ctx.drawImage(image1,0,0,width, height);
              imageData = ctx.getImageData(0,0, width, height);
                  for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                      r = 0.898*getRed(imageData,x,y)+0.769*getGreen(imageData,x,y)+0.189*getBlue(imageData,x,y);
                      if(r>255){
                        r = 255;
                      }        
                      g = 0.649*getRed(imageData,x,y)+0.686*getGreen(imageData,x,y)+0.168*getBlue(imageData,x,y);
                      if(g>255){
                        g = 255;
                      }
                      b = 0.349*getRed(imageData,x,y)+0.686*getGreen(imageData,x,y)+0.168*getBlue(imageData,x,y); 
                      if(b>255){
                        b = 255;
                      }                  
                      setPixel(imageData,x,y,r,g,b,a);          
                    }        
                  }
                  ctx.putImageData(imageData,0,0); 
            }           
          }   
        

        function negativeFilter(){
            image1.src = "images/leon.jpg";
            image1.onload = function(){
              ctx.drawImage(image1,0,0,width, height);
              imageData = ctx.getImageData(0,0, width, height);
                  for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                      r = getRed(imageData,x,y);        
                      g = getGreen(imageData,x,y);
                      b = getBlue(imageData,x,y);                   
                      setPixel(imageData,x,y, 255-r, 255-g, 255-b,a);          
                    }        
                  }
                  ctx.putImageData(imageData,0,0); 
            }           
        } 


        function greyScale(){
          image1.src = "images/leon.jpg";
          image1.onload = function(){
            ctx.drawImage(image1,0,0,width, height);
            imageData = ctx.getImageData(0,0, width, height);
                for (let x = 0; x < width; x++) {
                  for (let y = 0; y < height; y++) {
                    r = getRed(imageData,x,y);        
                    g = getGreen(imageData,x,y);
                    b = getBlue(imageData,x,y);         
                    grayPixel = generateAverageGray(r,g,b);          
                    setPixel(imageData,x,y, grayPixel, grayPixel, grayPixel,a);          
                  }        
                }
                ctx.putImageData(imageData,0,0); 
          }           
        }
        
        function binarizationFilter(){
            let pixel;
            image1.src = "images/leon.jpg";
            image1.onload = function(){
              ctx.drawImage(image1,0,0,width, height);
              imageData = ctx.getImageData(0,0, width, height);
                  for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                     pixel = getRed(imageData,x,y) +getGreen(imageData,x,y)+ getBlue(imageData,x,y); 
                       //uso 381 ((255 + 255 + 255) / 2) como valor frontera entre Blanco y Negro.
                     if(pixel>381){
                      setPixel(imageData,x,y,255,255,255,a); 
                     }else{
                      setPixel(imageData,x,y,0,0,0,a);   
                     }
                    }        
                  }
                  ctx.putImageData(imageData,0,0); 
            }           
        }  
            
    }

    function generateAverageGray(r,g,b){
        let gray = (r+g+b)/3;
        return gray;
    }

    function setPixel(image,x,y,r,g,b,a){
        let index = ( x + y * image.width ) * 4;
        image.data[index] = r;
        image.data[index +1] = g;
        image.data[index +2] = b;
        image.data[index +3] = a;  
      }

      function setPixelMoreBright(imageData, x, y, r, g, b, a){
        let index = (x+y*imageData.width) * 4;   
    
        imageData.data[index + 3]=a;      
        imageData.data[index + 0] = r + 10;
        imageData.data[index + 1] = g + 10;
        imageData.data[index + 2] = b + 10;
        
    }

    function setPixeLessBright(imageData, x, y, r, g, b, a){
      let index = (x+y*imageData.width) * 4;   
    
      imageData.data[index + 3]=a;      
      imageData.data[index + 0] = r - 10;
      imageData.data[index + 1] = g - 10;
      imageData.data[index + 2] = b - 10;
      
  }
  
      function getRed(image,x,y){
        let index =(x+y*image.width)*4;
       return image.data[index];
      }  
     function getGreen(image,x,y){
      let index=(x+y*image.width)*4;
      return image.data[index+1];
      }  
      function getBlue(image,x,y){
      let index=(x+y*image.width)*4;
      return image.data[index+2];
      } 
      imagenCanvas();
    
    
})
