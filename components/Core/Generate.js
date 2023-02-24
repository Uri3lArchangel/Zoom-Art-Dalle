const axios = require('axios');
const apiKey = process.env.APIKEY
const apiUrl = process.env.APIURL;



async function generateImage(imageDescription){
    try{
   const response = await axios({
        method: 'POST',
        url: apiUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        data: {
            'model': 'image-alpha-001',
            'prompt': imageDescription,
            'num_images': 1,
            'size': '1024x1024',
            'response_format': 'url'
        }

    });
  
    console.log(response.data.data[0].url)
    return response.data.data[0].url
} catch (error) {
    if (error.name === 'AbortError') {
    running = false
      console.log('Request cancelled');
    } else {
      console.error('Request error:', error);
    }
  }
}

module.exports=generateImage