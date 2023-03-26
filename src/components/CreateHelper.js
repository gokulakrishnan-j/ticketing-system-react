import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../global/Api';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import '../App.css'


function CreateHelper() {
    const navigate = useNavigate()
    const {name,home} = useParams()
    const [helperList,setHelperList] = useState([])
    const [helperQuerCompleted,setHelperQuerCompleted] = useState([])
 

    


    useEffect(()=>{
      fetch(`${API}/admin/helper`,{
        method :'GET',
        headers:{
          /* send a token in headers for authorization */
         admintoken: localStorage.getItem("token"),
         
     }
      })
      .then((data)=>data.json())
      .then((query)=>setHelperList(query.reverse()))

      fetch(`${API}/admin/query`,{
        method :'GET',
        headers:{
          /* send a token in headers for authorization */
         admintoken: localStorage.getItem("token"),
     }
      })
      .then((data)=>data.json())
      .then((query)=>setHelperQuerCompleted(query))
      
     },[])


    
  return (
    <div >
      <Box sx={{ flexGrow: 1,marginTop:4 ,position:"sticky",top:"0px" }}>
      <AppBar position="static" sx={{bgcolor:"#316472e5" ,borderRadius:"16px"}} >
        <Toolbar >
            
          <Button  color="inherit" onClick={()=>navigate(`/admin/${name}/${home}/helper`)}>Create Helper</Button>
        </Toolbar>
      </AppBar>
    </Box>



    <div className='adminhelperdetails'> 
      {helperList.map((n,index)=>(
        <div id='adminhelperbox' className="alert alert-dark" role="alert" key={index}>
        <div >{n.helpername}</div>
        <div className='adminHelper'>
          <div>{n.name}</div>
        <div>Created Date<div>{n.createdDate}</div></div>
        <div>Total completion <div>{helperQuerCompleted.filter((s)=>s.assigedhelpername === n.helpername).length}</div></div>
        <div><ModeEditOutlinedIcon sx={{cursor:"pointer"}} fontSize='small' onClick={()=>navigate(`/admin/${name}/${home}/${n.helpername}/changehelpername`)}/></div>
        </div>
        
        
        
      </div>
       
      ))}
      </div> 
    </div>
  )
}

export default CreateHelper
