import React,{useState,useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ListOfQuery from './ListOfQuery';
import '../App.css'
import { API } from '../global/Api';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import createObjectURL from 'create-object-url'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


function UserDashBoard() {
  const {name} = useParams()
 
  const [token,settoken] = useState(null)

  useEffect(()=>{

    /* making API request to get token */
    fetch(`${API}/user/token/${name}`)
    .then((data)=>data.json())
    .then((msg)=>settoken(msg))
    
},[name])
return token? <Token token={token} /> : null
}

function Token ({token}){
  const {name} = useParams()
  const navigate = useNavigate()
  const [profile,setProfile] = useState(null)
  const[triggerProfile,setTriggerProfile] = useState({})
  const [menu,setMenu] = useState(false)
  const [open, setOpen] =useState(false);
  const handleOpen = () => { if(open){setOpen(false)}else{setOpen(true)};}
  const handleClose = () => setOpen(false);

  localStorage.setItem("token",token.usertoken)

  const handleLogout = ()=>{
    fetch(`${API}/user/logout/${name}`,{
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
  
  fetch(`${API}/user/profile/${name}`,{
  
    method :'PUT',
    body :JSON.stringify({profile:profileImgage}),
    headers:{
      /* send a token in headers for authorization */
     usertoken: localStorage.getItem("token"),
     "Content-Type" : "application/json"
  }
  })
}



  useEffect(()=>{

    fetch(`${API}/user/profile/${name}`,{
      method : "GET",
      headers:{
        usertoken: localStorage.getItem("token")
        
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

  
    fetch(`${API}/user/profile/${name}`,{
    
      method :'PUT',
      body :JSON.stringify({profile: ""}),
      headers:{
        /* send a token in headers for authorization */
       usertoken: localStorage.getItem("token"),
       "Content-Type" : "application/json"
    }
    })
    .then(()=>setTriggerProfile())
  }

  return (
    <div className='userDashBoard'>
         <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor:"rgba(64, 195, 218, 0.274)"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <Stack direction="row" spacing={2}>
      <div>
      <Avatar
        alt="Remy Sharp"
        src={profile ? profile.profileimage :null}
        sx={{ width: 50, height: 50 ,}}
        onClick={handleOpen}
      ></Avatar>
        <div style={{display:open ? "inline":"none"}} onClick={()=>setOpen(false)}><input type="file" className='profileInputForMoble' onChange={(e)=>handleProfile(e.target.files[0])}/>
   </div>
   </div>
    </Stack>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <div className='name'>{name}</div>
          </Typography>

          <div className='menu'>
          {menu?<HighlightOffIcon onClick={()=>setMenu(false)}/>:
<MenuIcon onClick={()=>setMenu(true)}/>}
</div>

<div  style={{display:menu?"inline":"none"} } onClick={()=>setMenu(false)}>

<div><Button color="inherit" sx={{fontSize:"3vw"}} onClick={()=>navigate(`/student/changepassword/${name}`)}>Change Password</Button></div>
<div> <Button color="inherit" sx={{fontSize:"3vw"}} onClick={()=>handleLogout()}>Logout</Button></div>

</div>

<div className='appbarMenus'>
          <div><Button color="inherit"  onClick={()=>navigate(`/student/changepassword/${name}`)}>Change Password</Button></div></div>
          <div className='appbarMenus'>
         <div> <Button color="inherit"  onClick={()=>handleLogout()}>Logout</Button></div>
          </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='avatar'
      >
        <Box sx={style}>
          <Typography className='profilOverFlowHih' id="modal-modal-title" variant="h6" component="h2">
            <input className='profileChooseher' type="file" onChange={(e)=>handleProfile(e.target.files[0])}/>
            <img className='profilImage' src={profile ? profile.profileimage : null}  alt="profil" />
            <DeleteForeverIcon onClick={()=>handleRemoveProfile()}/>
          </Typography>
        </Box>
      </Modal>

          
        </Toolbar>
      </AppBar>
    </Box>


    <div id='createquery' className="alert alert-success"  onClick={()=>navigate(`/student/${name}/create-query`)} role="alert">
  <AddIcon/>Create Query
</div>

<div>
<div className='querysList'>
   <ListOfQuery/>
</div>

</div>
    </div>
  )
}

export default UserDashBoard
