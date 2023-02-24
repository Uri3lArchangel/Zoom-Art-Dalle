
import { NextApiRequest, NextApiResponse } from 'next'
import {core} from '../../components/Core/core' 


const controller = new AbortController()
const signal = controller.signal

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
if(req.method == 'POST'){
  try{
    const {prompt,number} = JSON.parse(req.body)
    console.log('recieved',prompt, number)
    await core(prompt,number,signal)
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