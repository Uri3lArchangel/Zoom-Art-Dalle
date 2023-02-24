
const fs = require('fs')
const path = require('path')

const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.APIKEY
const configuration = new Configuration({
    apiKey: apiKey,
  });
const openai = new OpenAIApi(configuration);


const createEdit=async()=>{

  const filePath = path.join(process.cwd(), 'components','Core','output.png');
    const response = await openai.createImageEdit(
        fs.createReadStream(filePath),
        fs.createReadStream(filePath),  
        'random',
          1,
      "1024x1024"
  );
    console.log(response.data.data[0].url)
    return response.data.data[0].url
  
  
}


module.exports=createEdit

