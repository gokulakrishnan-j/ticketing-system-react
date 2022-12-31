import React, { useState ,useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AdminChart from './AdminChart';
import CreateHelper from './CreateHelper';
import '../App.css'
import CreateManager from './CreateManager';
import Adminhome from './Adminhome';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../global/Api';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import createObjectURL from 'create-object-url'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Admin() {
  const {name} = useParams()
 
  const [token,settoken] = useState(null)

  useEffect(()=>{

    /* making API request to get token */
    fetch(`${API}/admin/token/${name}`)
    .then((data)=>data.json())
    .then((msg)=>settoken(msg))
    
},[name])
return token? <Token token={token} /> : null
}

function Token ({token}){
  const navigate =useNavigate()
  const {name,home} = useParams()
  const [details,setdetails] = useState(null)
    const [profile,setProfile] = useState(null)
    const[triggerProfile,setTriggerProfile] = useState({})
    const [menu,SetMenu] = useState(false)
  const [open, setOpen] =useState(false);
  const handleOpen = () =>{ if(open){setOpen(false)}else{setOpen(true)};}
  const handleClose = () => setOpen(false);

  localStorage.setItem("token",token.admintoken)

if(details){
  navigate(`/admin/${name}/${details}`)
  setdetails(null)
 }

 const handleLogout = ()=>{
  fetch(`${API}/admin/logout/${name}`,{
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
    
  
  
  fetch(`${API}/admin/profile/${name}`,{
  
    method :'PUT',
    body :JSON.stringify({profile:profileImgage}),
    headers:{
      /* send a token in headers for authorization */
     admintoken: localStorage.getItem("token"),
     "Content-Type" : "application/json"
  }
  })
}
 

   useEffect(()=>{

    fetch(`${API}/admin/profile/${name}`,{
      method : "GET",
      headers:{
        admintoken: localStorage.getItem("token")
        
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

  
  fetch(`${API}/admin/profile/${name}`,{
  
    method :'PUT',
    body :JSON.stringify({profile: ""}),
    headers:{
      /* send a token in headers for authorization */
     admintoken: localStorage.getItem("token"),
     "Content-Type" : "application/json"
  }
  
  })
  .then(()=>setTriggerProfile())
}
  return (
    <div className='admin'>
         <Box sx={{ flexGrow: 1 ,position:"sticky",top:"0px"}}>
      <AppBar position="static" sx={{bgcolor:"rgb(59, 140, 151)"}}>
        <Toolbar>
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
        src={profile ? profile.profileimage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
        sx={{ width: 50, height: 50  }}
        onClick={handleOpen}
      > </Avatar>

   <div style={{display:open ? "inline":"none"}} onClick={()=>setOpen(false)}><input type="file" className='profileInputForMoble' onChange={(e)=>handleProfile(e.target.files[0])}/>
   </div>
   </div>
     
    </Stack>
          </IconButton>
          <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <div className='name'> {name}</div>
          </Typography>




      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='avatar'
        
      >
        <Box sx={style} >
          <Typography className='profilOverFlowHihe' id="modal-modal-title" variant="h6" component="h2">
            <input type="file"  onChange={(e)=>handleProfile(e.target.files[0])}/>
            <img className='profilImage' src={profile ? profile.profileimage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}  alt="profil" />
            <DeleteForeverIcon onClick={()=>handleRemoveProfile()}/>

          </Typography>
        </Box>
      </Modal>

      <div className='menu'>

{menu?<HighlightOffIcon onClick={()=>SetMenu(false)}/>:
<MenuIcon onClick={()=>SetMenu(true)}/>}
</div>

<div  style={{display:menu?"inline":"none"} } onClick={()=>SetMenu(false)}> <div ><Button color="inherit" value='home' sx={{fontSize:"3vw"}}  onClick={(e)=>setdetails(e.target.value)  }>Home</Button></div>
      <div > <Button color="inherit" sx={{fontSize:"3vw"}} value='create helper' onClick={(e)=>setdetails(e.target.value)}>Helper</Button></div>
      <div ><Button  color="inherit" sx={{fontSize:"3vw"}} value='create manager' onClick={(e)=>setdetails(e.target.value)}>Manager</Button></div>
     <div > <Button color="inherit"  sx={{fontSize:"3vw"}} onClick={()=>navigate(`/admin/changepassword/${name}`)}>Change Password</Button></div>
         <div > <Button  color="inherit" sx={{fontSize:"3vw"}} onClick={()=>handleLogout()}>Logout</Button></div></div>
         

<div className='appbarMenus'>
          <div><Button color="inherit" value='home' onClick={(e)=>setdetails(e.target.value) }>Home</Button></div></div>
          <div className='appbarMenus'>
      <div> <Button color="inherit"  value='create helper' onClick={(e)=>setdetails(e.target.value)}>Helper</Button></div></div>
      <div className='appbarMenus'>
      <div><Button color="inherit"  value='create manager' onClick={(e)=>setdetails(e.target.value)}>Manager</Button></div></div>
      <div className='appbarMenus'>
     <div> <Button sx={{color:"white"}} onClick={()=>navigate(`/admin/changepassword/${name}`)}>Change Password</Button></div></div>
      
     <div className='appbarMenus'>
      <div> <Button color="inherit" onClick={()=>handleLogout()}>Logout</Button></div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>

    <div className='adminDashBoard'>
<div className='adminSideBar'>
    
    <AdminChart/>
   
    </div>
    <div className='adminDetails'>
      {home === 'create helper' ?<CreateHelper/>:null }
   { home === 'create manager' ?<CreateManager/> :null }
   { home === 'home' ? <Adminhome/> :null }
    </div>
    </div>
    </div>
  )
}

export default Admin