import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../global/Api';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import '../App.css'

export default function CreateManager() {
  const navigate = useNavigate()
  const {name,home} = useParams()
    const [managerList,setManareList] = useState([])
    const [managerQuerCompleted,setManagerQuerCompleted] = useState([])

    

    useEffect(()=>{
      fetch(`${API}/admin/manager`,{
        method :'GET',
        headers:{
          /* send a token in headers for authorization */
         admintoken: localStorage.getItem("token"),
         
     }
      })
      .then((data)=>data.json())
      .then((query)=>setManareList(query.reverse()))

      fetch(`${API}/admin/query`,{
        method :'GET',
        headers:{
          /* send a token in headers for authorization */
         admintoken: localStorage.getItem("token"),
     }
      })
      .then((data)=>data.json())
      .then((query)=>setManagerQuerCompleted(query))
     },[])
  return (
    <div >
      <div >
        <Box sx={{ flexGrow: 1,marginTop:4}}>
      <AppBar position="static" sx={{bgcolor:"#316472e5",borderRadius:"16px"}} >
        <Toolbar >
            
          <Button  color="inherit" onClick={()=>navigate(`/admin/${name}/${home}/manager`)}>Create Manager</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
    <div>
    <div className='adminmanagerdetails'>
      {managerList.map((n,index)=>(
        <div id='adminmanagerbox' className="alert alert-dark" role="alert" key={index}>
        <div>{n.managername}</div><br/>
        <div className='adminManager'>
          <div>{n.name}</div>
        <div>Created Date<div>{n.createdDate}</div></div>
        <div>Role<div>{n.position}</div></div>
        <div>Total completion <div>{managerQuerCompleted.filter((s)=>s.completedmanagername === n.managername).length}</div></div>
        <div><ModeEditOutlinedIcon sx={{cursor:"pointer"}} fontSize='small' onClick={()=>navigate(`/admin/${name}/${home}/${n.managername}/changemanagername`)}/></div>
        </div>
        </div>
      ))}
</div>
</div>
    </div>
  )
}
