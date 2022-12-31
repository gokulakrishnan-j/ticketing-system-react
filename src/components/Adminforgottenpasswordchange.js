import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { API } from '../global/Api';
import KeyIcon from '@mui/icons-material/Key';
import "../App.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from '@mui/material';

const formValidation = yup.object({
    password:yup
    .string()
    .min(8,"your password must be at least 8 characters")
    .max(14, "your password must be at less then 14 characters")
    .required('create a password'),
   
    
    })

function Adminforgottenpasswordchange() {

    const {adminname} = useParams()
    const navigate = useNavigate()
    const [genPassword,setGenPassword] = useState({})
    const [confirmPassword,setconFirmPassword] = useState('')
    const [showpassword,setShowpassword] = useState(false)


    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
      initialValues : {
          password : '',

          
      },
      validationSchema : formValidation,
  
      onSubmit : (value)=>{
console.log(value)

if(confirmPassword === value.password){
  usersignupData(value)
 }else{
  alert("Created password and confirm password not matching")
 }
      
      }
  })

  const usersignupData = (value)=>{
    fetch(`${API}/admin/changeforgottenpassword/${adminname}`,{
      method :'PUT',
      body:JSON.stringify(value),
      headers:{"Content-Type":"application/json"}
    })
    .then((value)=>value.ok ? navigate('/home'):alert('Server side error'))
  }

  const autoGenPassword = ()=>{
    fetch(`${API}/user/autogenpassword`)
    .then((data)=>data.json())
    .then((password)=>setGenPassword(password))
  }

  return (
    <div className="inputbox">
        <div className="input">

<form onSubmit={handleSubmit}>
<Box
component="form"
sx={{
'& .MuiTextField-root': { m: 1,  },
}}
noValidate
autoComplete="off"
className="inputfeild"
>


 

<div>
<TextField
name='password'
value={values.password }
onChange={handleChange}
onBlur={handleBlur}
  error = {touched.password && errors.password}
 
  label ='create password'
  type = {showpassword ?"text":"password"}
  helperText={touched.password && errors.password ? errors.password : null}

  InputProps={{
    endAdornment: (
      <InputAdornment position="start">
       {showpassword ? <VisibilityIcon onClick={()=>setShowpassword(false)}/> : < VisibilityOffIcon onClick={()=>setShowpassword("true")} />}
      </InputAdornment>
     )
    }}

/> 
</div>
<div>

<TextField
value= {confirmPassword}
onChange={(e)=>setconFirmPassword(e.target.value)}


  label ='confirm password'
/> 

</div> <div><Button endIcon={<KeyIcon />} onClick={()=>autoGenPassword()}>gentare</Button></div>

<p>{genPassword.password}</p>

</Box>

<div>
<button type="submit" className="btn btn-info">Create</button>
</div>

</form>
</div>
    </div>
  )
}

export default Adminforgottenpasswordchange