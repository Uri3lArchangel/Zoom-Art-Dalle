const storeImage = require('./storeImage')
const resize = require('./resize')
const fs=require('fs')
const createEdit = require('./createEdit')
const path =require('path')


const filePath = path.join(process.cwd(), 'public', 'images');
export async function coreFromImage(numberOfImages,signal){
    try {
    for(let i=1;i<=numberOfImages;i++){
      console.log('itereation',i)
        if(!signal.aborted){
        
       await resize(`${filePath}/${i}.jpg`).then(async()=>{
       await createEdit().then(async(url)=>{
        await storeImage(url,i)
       })
       })
        
    }else{
      i=0
        break
    }
}
} catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request cancelled');
    } else {
      console.error('Request error:', error);
    }
  }
}


