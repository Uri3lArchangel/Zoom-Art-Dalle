const generateImage = require('./Generate')
const store = require('./store')
const resize = require('./resize')
const fs=require('fs')
const createEdit = require('./createEdit')
const path =require('path')

const filePath1 = path.join(process.cwd(), 'components', 'Core', 'output.png');

const filePath = path.join(process.cwd(), 'public', 'images');
export async function core(description,numberOfImages,signal){
    try {
    let currentDescription = description
    for(let i=0;i<numberOfImages;i++){
      console.log('itereation',i)
        if(!signal.aborted){
    if(i === 0){
    const url = await generateImage(currentDescription)
     await store(url,i)
    }
    else{
       await resize(`${filePath}/${i}.jpg`).then(async()=>{
        const url =await createEdit()
        await store(url,i)
       })
        
    }
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


