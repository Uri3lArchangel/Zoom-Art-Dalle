const fs = require('fs');
const path = require('path');
const sharp = require('sharp')


const filePath = path.join(process.cwd(), 'components', 'Core', 'output.png');


 async function resize(image){
  console.log('resizing')
        const metadata = await sharp(image).metadata();
        const { width, height } = metadata;
      
        // Calculate the dimensions of the output image
        const outputWidth = Math.floor(width * 40 / 100);
        const outputHeight = Math.floor(height * 40 / 100);
      
        // Set the dimensions of the canvas
        const canvasWidth = 1024;
        const canvasHeight = 1024;
      
        const output = await sharp(image)
          .resize(outputWidth, outputHeight, {
            fit: 'inside',
            withoutEnlargement: true,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .extend({
            top: Math.max(0, Math.floor((canvasHeight - outputHeight) / 2)),
            bottom: Math.max(0, Math.ceil((canvasHeight - outputHeight) / 2)),
            left: Math.max(0, Math.floor((canvasWidth - outputWidth) / 2)),
            right: Math.max(0, Math.ceil((canvasWidth - outputWidth) / 2)),
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .png()
          .toFile(filePath);
      
        console.log('resizing ended');
      
    }

    module.exports = resize