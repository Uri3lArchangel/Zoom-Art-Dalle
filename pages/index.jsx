import axios from 'axios'
import  { useRouter } from 'next/router'
import React, { Fragment, useEffect, useRef } from 'react'
// import {core} from '../components/Core/core'

function index() {
    const router = useRouter()
    let promptRef =useRef() 
    let numberRef=useRef()

    let imageRef = useRef()
    const controller = new AbortController()
    const signal = controller.signal

    async function abort(){
        controller.abort()
        await fetch('http://localhost:3000/api/core?abort=true',{
            method:'GET',
            mode:'no-cors'
        })
        await fetch('http://localhost:3000/api/coreFromImage?abort=true',{
            method:'GET',
            mode:'no-cors'
        })
        document.getElementById('abort').style.display = 'none'

    }

    async function generateFromPrompt(){
    
    document.getElementById('abort').style.display = 'block'
    
    let prompt =promptRef.current.value
    let number = Number(numberRef.current.value).toFixed(0)
    if(prompt == ''){
        document.getElementById('promptText').value = 'Prompt Cannot Be Empty'
        document.getElementById('promptText').style.color='red'
        let timeout = setTimeout(()=>{
            document.getElementById('promptText').value = "Enter Your Promp Here"
            document.getElementById('promptText').style.color='black'

        },3000)
        return
    }else if(number == ''){
        document.getElementById('numberText').value = 'Number Cannot Be Empty'
        document.getElementById('numberText').style.color='red'
        let timeout = setTimeout(()=>{
            document.getElementById('numberText').value = "Enter the number of images you want to generate Note: The higher this number the longer it will take"
            document.getElementById('numberText').style.color='black'

        },3000)
        return
    }
    else if(number <2){
        document.getElementById('numberText').value = 'Number must be atleast 2'
        document.getElementById('numberText').style.color='red'
        let timeout = setTimeout(()=>{
            document.getElementById('numberText').value = "Enter the number of images you want to generate Note: The higher this number the longer it will take"
            document.getElementById('numberText').style.color='black'

        },3000)
        return
    }
    let data ={
        "prompt":prompt,
        "number":number
    }
    document.getElementById('progress').style.display='block'
    fetch('http://localhost:3000/api/core',
        {method:'POST',body:JSON.stringify(data),mode:'no-cors'},{signal}).then((res)=>{
            if(!signal.aborted){
         router.push(`/zoom?number=${number}`)
            }else{
                alert('Request canceled')
                router.reload()
            }
        },(err)=>{
            alert(err)
            abort()
            router.reload()
        }).catch((err)=>{
            if (err.name === 'AbortError') {
                  console.log('Request cancelled');
                  router.reload()

                } else {
                  console.error('Request error:', err);
                  abort()
                  router.reload()
                }

        })

        
      
    }

    async function generateFromImage(){

    let number = numberRef.current.value
    let image = imageRef.current.files[0]

    document.getElementById('abort').style.display = 'block'
     if(number == ''){
        document.getElementById('numberText').value = 'Number Cannot Be Empty'
        document.getElementById('numberText').style.color='red'
        let timeout = setTimeout(()=>{
            document.getElementById('numberText').value = "Enter the number of images you want to generate Note: The higher this number the longer it will take"
            document.getElementById('numberText').style.color='black'

        },3000)
        return
    }
    else if(number <2){
        document.getElementById('numberText').value = 'Number must be atleast 2'
        document.getElementById('numberText').style.color='red'
        let timeout = setTimeout(()=>{
            document.getElementById('numberText').value = "Enter the number of images you want to generate Note: The higher this number the longer it will take"
            document.getElementById('numberText').style.color='black'

        },3000)
        return
    }else if(image == undefined|| image == ''){
        document.getElementById('or').innerHTML = 'Please select an image'
        document.getElementById('or').style.color = 'red'
        setTimeout(()=>{
            document.getElementById('or').innerHTML = 'OR'
            document.getElementById('or').style.color = 'black'
        },3000)
        return
    }
        const fileReader = new FileReader()
        fileReader.readAsDataURL(image)
      fileReader.onload=async(e)=>{
            image = e.target.result



        
        const data={
            "image":image,
            "number":number
        }
            
            document.getElementById('progress').style.display='block'
              await fetch("http://localhost:3000/api/coreFromImage", {
                method: "POST",
                body: JSON.stringify(data),
                mode:'no-cors'
              },{signal}).then((res)=>{
                if(!signal.aborted){
             router.push(`/zoom?number=${number}`)
                }else{
                    alert('Request canceled')
                    router.reload()
                }
            },(err)=>{
                alert(err)
                abort()
                router.reload()
            }).catch((err)=>{
                if (err.name === 'AbortError') {
                      console.log('Request cancelled');
                      router.reload()
    
                    } else {
                      console.error('Request error:', err);
                      abort()
                      router.reload()
                    }
    
            })
    
            
          
            }
          };
    

useEffect(()=>{


})

 
  return (
<Fragment>
    <div style={{
        position:'absolute',
        top:'20%',
        width:'100%'
    }}>
        <h2 style={{textAlign:'center',display:'none'}} id='progress'>Generating please wait</h2>
        <button id='abort' style={{
             display:'none',
             margin:'auto',
             marginTop:'15px',
             width:'15%',
             padding:'0.3em',
             backgroundImage:'linear-gradient(to left,#f003,#00f3)',
             borderRadius:'10px',
             border:'none',
             cursor:'pointer'
        }} onClick={abort}>Cancel Request</button>
        <h1
        style={{
            textAlign:'center'
        }} id='promptText'
        >Enter Your Promp Here</h1>
        <input type="text" style={{
            textAlign:'center',
            display:'block',
            margin:'auto',
            width:'40%',
            height:'35px',
            borderRadius:'20px',
            border:'1px solid ',
            marginTop:'20px'
        }} ref={promptRef} />
        <p  style={{
            textAlign:'center',
            margin:'0.5em 0'
        }} id='numberText'>Enter the number of images you want to generate <i>Note: The higher this number the longer it will take 5 images ~ 5 minutes</i></p>
           <input type="number" min={2} style={{
            textAlign:'center',
            display:'block',
            margin:'auto',
            width:'10%',
            height:'35px',
            border:'1px solid ',
            marginTop:'20px'
        }} ref={numberRef} />
        <button style={{
            display:'block',
            margin:'auto',
            marginTop:'15px',
            width:'15%',
            padding:'0.3em',
            backgroundImage:'linear-gradient(to left,#f003,#00f3)',
            borderRadius:'10px',
            border:'none',
            cursor:'pointer'
        }} onClick={generateFromPrompt}>
            Generate from Prompt
        </button>
        <h1 style={{
            textAlign:'center',
            marginTop:'20px'
        }} id='or'>OR</h1>
        <input type="file" style={{
            margin:'auto',
            display:'block',
        }} ref={imageRef} />
         <button style={{
            display:'block',
            margin:'auto',
            marginTop:'15px',
            width:'15%',
            padding:'0.3em',
            backgroundImage:'linear-gradient(to left,#f003,#00f3)',
            borderRadius:'10px',
            border:'none',
            cursor:'pointer'
        }} onClick={generateFromImage}>
            Generate from Image
        </button>
      
    </div>
  
</Fragment >
  )
}

export default index

