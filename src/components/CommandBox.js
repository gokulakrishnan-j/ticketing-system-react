import React, { useEffect, useRef, useState } from 'react'
import {API} from '../global/Api'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

function CommandBox() {
    const {id} = useParams()
    const [getInput,setGetInput] = useState([])
    const [command,setCommand] = useState()
    const scrollDown = useRef(null)

    useEffect(()=>{
        fetch(`${API}/all/command/${id}`,{
          method :'GET',
          headers:{
            /* send a token in headers for authorization */
           managertoken: localStorage.getItem("token"),
           
       }
        })
        .then((data)=>data.json())
        .then((value)=>setGetInput(value))
    },[command,id])


    const handlePost = (data)=>{
     fetch(`${API}/management/command`,{
         method :'POST',
         body:JSON.stringify({command : data,
        ticketNo : id}),
         headers:{"Content-Type":"application/json",
         managertoken: localStorage.getItem("token")}
 
       })
       setCommand('')
    }
  

    useEffect(()=>{
scrollDown.current?.scrollIntoView()

    },[getInput])


   
  return (
    <div className='commands'>
        <div className='chating'>
       { getInput.map((n,index)=>(
        <p className='managerCommandMessages' key={index} >{n.command}</p>
        ))}
        
        <div ref={scrollDown}></div>
        </div>
        
        <div className='commandBoxAndButton'>
        <textarea className='managerCommandInput' value={command} onChange={(e)=>setCommand(e.target.value)}></textarea> 
            <button  className='managerCommandButton' onClick={()=>handlePost(command)}>Send</button>
        </div>
    </div>
  )
}



export default CommandBox