
const fs = require('fs')
const path = require('path')

const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.APIKEY
const configuration = new Configuration({
    apiKey: apiKey,
  });
const openai = new OpenAIApi(configuration);


const createEdit=async()=>{
console.log('creating edit')
  const filePath = path.join(process.cwd(), 'components','Core','output.png');
    const response = await openai.createImageEdit(
        fs.createReadStream(filePath),
        fs.createReadStream(filePath),  
        'random',
          1,
      "1024x1024"
  );
  console.log('editing complete')
    return response.data.data[0].url
  
  
}


module.exports=createEdit

