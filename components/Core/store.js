const axios = require('axios');
const fs = require('fs')
let firstTime = true
const path = require('path')

const store =async(url,i)=>{
    console.log('storing')
let image =await axios.get(url,{responseType:'arraybuffer'})
const filePath = path.join(process.cwd(), 'public', 'images');
if(!fs.existsSync(filePath)){
 fs.mkdirSync(filePath)
 firstTime = false
}else if(firstTime){
    fs.rmdirSync(filePath,{recursive:true})
    fs.mkdirSync(filePath)
    firstTime = false
}
fs.writeFileSync(`${filePath}/${i+1}.jpg`,image.data)

console.log('storing complete')

    
   

}

module.exports=store