const axios = require('axios');
const fs = require('fs')
const path = require('path')

const storeImage =async(url,i)=>{
const filePath = path.join(process.cwd(), 'public', 'images');
let image =await axios.get(url,{responseType:'arraybuffer'})
fs.writeFileSync(`${filePath}/${i+1}.jpg`,image.data)
    
   

}

module.exports=storeImage