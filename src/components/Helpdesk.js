import{Doughnut} from 'react-chartjs-2'
import React, { useEffect, useState } from 'react'
import {chart as chartjs} from 'chart.js/auto'
import { API } from '../global/Api'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
 import { useNavigate, useParams } from 'react-router-dom'
 import MenuIcon from '@mui/icons-material/Menu';
 import Brightness1Icon from '@mui/icons-material/Brightness1';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
 import '../App.css'
 import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import createObjectURL from 'create-object-url'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



function Helpdesk() {
  const {name} = useParams()
 
  const [token,settoken] = useState(null)

  useEffect(()=>{

    /* making API request to get token */
    fetch(`${API}/helpdesk/token/${name}`)
    .then((data)=>data.json())
    .then((msg)=>settoken(msg))
    
},[name])
return token? <Token token={token} /> : null
}
 function Token ({token}) {

  const navigate = useNavigate()
  const {name} = useParams()
  const [profile,setProfile] = useState(null)
  const[triggerProfile,setTriggerProfile] = useState(null)
  const [chart,setChart] =useState([])
  const [open, setOpen] =useState(false);
  const handleOpen = () =>  { if(open){setOpen(false)}else{setOpen(true)};}
  const handleClose = () => setOpen(false);


  localStorage.setItem("token",token.helpertoken)

    useEffect(()=>{
        fetch(`${API}/helpdesk/query`,{
          method :'GET',
          headers:{
            /* send a token in headers for authorization */
           helpertoken: localStorage.getItem("token"),
       }
        })
        .then((data)=>data.json())
        .then((query)=>setChart(query.reverse()))
       },[])

       const dateAndTime = new Date()
      const dd = dateAndTime.getDate()
    const mm = dateAndTime.getMonth()
    const yy = dateAndTime.getFullYear()
    const date = dd + '/' + (mm+1) + '/'+yy

       const length = chart.filter((len)=>(len.currentDate === date))
    const pending =  chart.filter((pending)=>(pending.status === 'pending'))
    const processing = chart.filter((processing)=>(processing.status === 'processing'))
    const completed = chart.filter((completed)=>(completed.status === 'completed'))

 const chartData ={
  type : 'line' ,
  labels : ['pending','processing','completed'],
  
  datasets :[
      {
          label : "status",
          data : [pending.length,processing.length,completed.length],
          backgroundColor: ['#c666b96e','#ffcc566e','#36a3eb6e'],
          borderColor:["#c666b9","#ffcc56","#36a3eb"],
          borderWidth: 2
      }
  ]
}

const handleLogout = ()=>{
  fetch(`${API}/helpdesk/logout/${name}`,{
    method :'DELETE',
    headers:{
      /* send a token in headers for authorization */
     admintoken: localStorage.getItem("token"),
 }
  })
  .then(()=>localStorage.removeItem("token"))
  .then(()=>(navigate('/home')))
 }

const handleProfile =(profile)=>{

 
    setTriggerProfile(profile)

  const profileImgage = ( createObjectURL(profile))
    

  fetch(`${API}/helpdesk/profile/${name}`,{
    method :'PUT',
    body :JSON.stringify({profile:profileImgage}),
    headers:{
      /* send a token in headers for authorization */
     helpertoken: localStorage.getItem("token"),
     "Content-Type" : "application/json"
 }
  })
}


 useEffect(()=>{
  fetch(`${API}/helpdesk/profile/${name}`,{
    method : "GET",
    headers:{
      helpertoken: localStorage.getItem("token"),
    }
  })
  .then((data)=>data.json())
  .then((value)=>setProfile(value))
 },[triggerProfile,name])


 const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const handleRemoveProfile =()=>{

  
  fetch(`${API}/helpdesk/profile/${name}`,{
  
    method :'PUT',
    body :JSON.stringify({profile: ""}),
    headers:{
      /* send a token in headers for authorization */
     helpertoken: localStorage.getItem("token"),
     "Content-Type" : "application/json"
  }
  })
  .then(()=>setTriggerProfile())
}
  return (
    <div >
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar className='helperAppBar'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           <Stack direction="row" spacing={2}>
      <div>
      <Avatar
        alt="Remy Sharp"
        src= {profile ? profile.profileimage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
        sx={{ width: 50, height: 50 }}
        onClick={handleOpen}
      ></Avatar>

<div style={{display:open ? "inline":"none"}} onClick={()=>setOpen(false)}><input type="file" className='profileInputForMoble' onChange={(e)=>handleProfile(e.target.files[0])}/>
   </div>
   </div>
    </Stack>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <div className='name'> {name}</div>
          </Typography>
          
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='avatar'
      >
        <Box sx={style}>
          <Typography className='profilOverFlowHihe' id="modal-modal-title" variant="h6" component="h2">
            <input type="file" onChange={(e)=>handleProfile(e.target.files[0])}/>
            <img className='profilImage' src={profile ? profile.profileimage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}  alt="profil" />
            <DeleteForeverIcon onClick={()=>handleRemoveProfile()}/>
          </Typography>
        </Box>
      </Modal>

          <Button color="inherit" onClick={()=>handleLogout()}><div className='helperLogout'>Logout</div> </Button>
        </Toolbar>
      </AppBar>
    </Box>
    <div className='charts'>
    <div  className='helperChart'>
<Doughnut data={chartData} />
</div>

<div  className='todyQuerys'>
<Card sx={{bgcolor:"#d6d6d690", borderRadius: "12px"}} >
      <CardContent>
      <h4 className='todayQuerysTitle'>Today Querys</h4>
        <h1 className='todayQuerysTitle'>{length.length}</h1>
      </CardContent>

    </Card>
</div>
</div>

<div className='helperQueryList'>
<div className='listofquerysBefore450px'>
{chart.map((n,index)=>(
        <div id='helperQuerys' className="alert alert-secondary" role="alert"
        key={index}
        onClick={()=>navigate(`/helper/${name}/${n._id}`)}
        >
          <div className='leftQuery'>
  <h5 className='ticket'>{n._id}
  <span className='userQueryTitle'>- {n.queryTitle}</span>
  </h5>
 
  <div id='category' className="alert alert-warning" role="alert">
  <div className='categorysName'>{n.category} </div> 
  <div>
     <Brightness1Icon sx={{color:n.team ? "#4AE211" :"#E72D1A"}}/>
     </div>
  </div>
  </div>
  <div className='rightQuery'>
  <h5 className='dateAndTime'>{n.currentDate}<br/>{n.currentTime}</h5>
  <h5 className='status'>{n.status}</h5>
  </div>

  
</div>
))}
 
</div>

<div className='listofquerysAfter450px'>
{chart.map((n,index)=>(
        <div id='helperQuerys' className="alert alert-secondary" role="alert"
        key={index}
        onClick={()=>navigate(`/helper/${name}/${n._id}`)}
        >
          <div className='leftQuery'>
  <h5 className='ticket'>{n._id}
  <span className='userQueryTitle'>- {n.queryTitle}</span>
  </h5>
 
  <div className='rightQuery'>
  <div id='category' className="alert alert-warning" role="alert">
  <div className='categorysName'>{n.category} </div> 
  <div>
     <Brightness1Icon sx={{color:n.team ? "#4AE211" :"#E72D1A"}}/>
     </div>
  </div>
  </div>
  <div >
  <h5 className='dateAndTime'>{n.currentDate}<br/>{n.currentTime}</h5>
  <h5 className='status'>{n.status}</h5>
  </div>
  </div>
  
</div>
))}
</div>

</div>



    </div>
  )
}

export default Helpdesk