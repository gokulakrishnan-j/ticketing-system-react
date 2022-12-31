import React, { useEffect, useState } from 'react'
import { API } from '../global/Api'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import PlacementTeam from './PlacementTeam';
import PreBootcampTeam from './PreBootcampTeam';
import CoordinationTeam from './CoordinationTeam';
import ZenClassTeam from './ZenClassTeam';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import createObjectURL from 'create-object-url'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Management() {
  const {name} = useParams()
  const [token,settoken] = useState(null)


  useEffect(()=>{

    /* making API request to get token */
    fetch(`${API}/management/token/${name}`)
    .then((data)=>data.json())
    .then((msg)=>settoken(msg))
    
},[name])



return token  ? <Token token={token} /> : null
}


 function Token({token}) {
    const navigate =useNavigate()
    const {name} = useParams()
    const [profile,setProfile] = useState(null)
    const[triggerProfile,setTriggerProfile] = useState(null)
    const [managerDetails,setManagerDetails] = useState({})
    const [open, setOpen] =useState(false);
    const handleOpen = () =>  { if(open){setOpen(false)}else{setOpen(true)};}
    const handleClose = () => setOpen(false);

localStorage.setItem("token",token.managertoken)



useEffect(()=>{
  fetch(`${API}/management/details/${name}`,{
    method :'GET',
    headers:{
      /* send a token in headers for authorization */
     admintoken: localStorage.getItem("token"),
 }
  })
    .then((data)=>data.json())
    .then((query)=>setManagerDetails(query))
},[name])


 const handleLogout = ()=>{
  fetch(`${API}/management/logout/${name}`,{
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
  


fetch(`${API}/management/profile/${name}`,{

  method :'PUT',
  body :JSON.stringify({profile:profileImgage}),
  headers:{
    /* send a token in headers for authorization */
   managertoken: localStorage.getItem("token"),
   "Content-Type" : "application/json"
}
})
  }


useEffect(()=>{

  fetch(`${API}/management/profile/${name}`,{
    method : "GET",
    headers:{
      managertoken: localStorage.getItem("token")
      
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

  
  fetch(`${API}/management/profile/${name}`,{
  
    method :'PUT',
    body :JSON.stringify({profile: ""}),
    headers:{
      /* send a token in headers for authorization */
     managertoken: localStorage.getItem("token"),
     "Content-Type" : "application/json"
  }
  })
  .then(()=>setTriggerProfile())
}

  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className='managerAppBar'>
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
        sx={{ width: 50, height: 50 }}
        onClick={handleOpen}
      ></Avatar>
 <div style={{display:open ? "inline":"none"}} onClick={()=>setOpen(false)}><input type="file" className='profileInputForMoble' onChange={(e)=>handleProfile(e.target.files[0])}/>
   </div>
   </div>

    </Stack>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <div className='name'>  {name} </div>
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
          
          <Button color="inherit" onClick={()=>handleLogout()} ><div className="managerLogout">Logout</div></Button>
        </Toolbar>
      </AppBar>
    </Box>

    <div className='managerPosition'>
    {managerDetails.position}
</div>
   
{
managerDetails.position === "Placement team"?
<PlacementTeam/> :null }
{managerDetails.position === "Pre-Bootcamp team"?
    <PreBootcampTeam/> :null}
    {managerDetails.position === "Coordination team"?
    <CoordinationTeam/> :null}
    {managerDetails.position === "Zen-Class team"?
    <ZenClassTeam/> :null}

    </div>
  )
}

export default Management