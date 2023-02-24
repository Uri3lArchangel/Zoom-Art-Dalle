
import { NextApiRequest, NextApiResponse } from 'next'
import {coreFromImage} from '../../components/Core/coreFromImage' 
import fs from 'fs'
import path from 'path'

const controller = new AbortController()
const signal = controller.signal

const filePath = path.join(process.cwd(), 'public', 'images');

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
if(req.method == 'POST'){
  try{
    console.log('recieved')
    const { image, number } = JSON.parse(req.body);
    const imageData = Buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
    if(fs.existsSync(filePath)){
        fs.rmSync(filePath,{recursive:true})
        fs.mkdirSync(filePath)
    }else{
        fs.mkdirSync(filePath)
    }
      fs.writeFileSync(`${filePath}/1.jpg`, imageData)
    await coreFromImage(number,signal)

    res.status(200).json({'status':true})
  }
  catch(err){
    res.status(500).json({'status':err})

  }

}else if(req.method == 'GET'){
  if(req.query.abort == 'true'){
    controller.abort()
    res.status(200).json({'message':'request canceled'})
  }
}
else{
  res.status(405).json({'message':'only POST method is allowed'})
}
}