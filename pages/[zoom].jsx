import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MyPage({number}) {
const router = useRouter()
let interval

function zoom(num){
  let Zoom
  let id = num
  localStorage.setItem('total',num)
  localStorage.setItem('zoom',1)
  localStorage.setItem('id',id)
  let image = document.getElementById('image')
  image.src = `/images/${num}.jpg`
  interval= setInterval(()=>{
    image.style.transition='all 0.5s linear'

    let _zoom = localStorage.getItem('zoom')
    Zoom = (Number(_zoom) + 0.01).toFixed(2)
    localStorage.setItem('zoom',Zoom)
    // console.log('small',Number(Zoom))
    image.style.transform=`scale(${Zoom})`
    console.log('main',Zoom)

    if(Number(Zoom) >= 2.44){
     image.style.transition='none'
      // alert('helo')
      let _id = localStorage.getItem('id')
      
      id = Number(_id) - 1    
      image.src = `/images/${id}.jpg`
      image.onload=()=>{
        Zoom = 1
        image.style.transform=`scale(${Zoom})`
        localStorage.setItem('zoom',Zoom)

      }


      localStorage.setItem('id',id)
     
      if(id == 1){
        id= localStorage.getItem('total')
        localStorage.setItem('id',id)

      }
      
    }
   
  },100)

}

useEffect(()=>{
  console.log('number',number)
  zoom(number)

return ()=>{
  clearInterval(interval)
}
},[])
  return(

  <div id="tld">
    <div  id="top">
    <img  alt="image1" id="image" width='100%' height='100%' />
  
    </div>
  
  </div>
)
}

export default MyPage
export async function getServerSideProps(context){
  let number = context.query.number
  console.log(number)
  return{
    props:{
      number
    }
  }
}