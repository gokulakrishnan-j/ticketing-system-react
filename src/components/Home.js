import React, { useEffect, useState } from 'react'
import '../App.css'
import AdminLogin from './AdminLogin'
import AllLogin from './AllLogin'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function Home() {
  return (
    <div className='home'>



      <div className='logoAndLogin'>
        <div className='logo'>
        <Logo/>
        </div>
        <div className='login'>
        <Login/>
    </div>
    </div>
    

      
        
    </div>
  )
}

function Logo (){
 
  
 return(
        <div className='homeTitle'>
         
<h1 className='homeTitle' >Ticketing-system</h1>
        </div>
    )
}

function Login (){
  const [loginButton,setLoginButton] = useState(null)
    return(
        <div>
          <div>
            <button style={{margin:"8px"}} type="button" value={'Admin login'} className="btn btn-secondary" onClick={(e)=>setLoginButton(e.target.value)}>LOGIN AS ADMIN</button>
    <button style={{margin:"8px"}} type="button" value={'All login'} className="btn btn-secondary" onClick={(e)=>setLoginButton(e.target.value)}>LOGIN AS USER</button>
    </div>
    { loginButton === 'Admin login' ? <div><AdminLogin/></div> :<div><AllLogin/></div> }
      </div>
    )
}

export default Home