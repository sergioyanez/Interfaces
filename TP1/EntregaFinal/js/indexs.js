'use strict';
document.addEventListener("DOMContentLoaded", function(){

    function setPixel(image,x,y,r,g,b,a){
        let index = ( x + y * image.width ) * 4;
        image.data[index] = r;
        image.data[index +1] = g;
        image.data[index +2] = b;
        image.data[index +3] = a;  
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
}
