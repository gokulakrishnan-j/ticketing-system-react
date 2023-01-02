import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { API } from '../global/Api';
import KeyIcon from '@mui/icons-material/Key';
import "../App.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from '@mui/material';

const formValidation = yup.object({
    name:yup
    .string()
    .required('Fill the name'),
    email:yup
    .string()
    .email('Enter valid email')
    .required('Fill the email'),
    password:yup
    .string()
    .min(8,"your password must be at least 8 characters")
    .max(14, "your password must be at less then 14 characters")
    .required('create a password'),
   
    
    })

function UserSignup() {
    const navigate = useNavigate()
    const [genPassword,setGenPassword] = useState({})
    const [confirmPassword,setconFirmPassword] = useState('')
    const [showpassword,setShowpassword] = useState(false)


    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
      initialValues : {
        name : '',
          email: '',
          password : '',
          role :'student',
          createdDate:'',
          createdTime: '',
          
      },
      validationSchema : formValidation,
  
      onSubmit : (value)=>{

        const dateAndTime = new Date()
      const dd = dateAndTime.getDate()
    const mm = dateAndTime.getMonth()
    const yy = dateAndTime.getFullYear()

    const h =dateAndTime.getHours()
    const m = dateAndTime.getMinutes()
    const s = dateAndTime.getSeconds()

const date = dd + '/' + (mm+1) + '/'+yy
var  time = ''
if(h === 0){
 time =  12 + ':' + m  + ':'+s +' ' + 'AM'
}
else if(h < 12){
  time =  h  + ':' + m  + ':'+s +' ' + 'AM'
}else if(h === 12){
  time =  h  + ':' + m  + ':'+s +' ' + 'PM'
}
else{
   time =  h -12 + ':' + m  + ':'+s +' '+ 'PM'
}

value.createdDate = date
value.createdTime =time


if(confirmPassword === value.password){
  usersignupData(value)
 }else{
  alert("Created password and confirm password not matching")
 }
      
      }
  })

  const usersignupData = (data)=>{
    fetch(`${API}/user/signup`,{
      method :'POST',
      body:JSON.stringify(data),
      headers:{"Content-Type":"application/json"}
    })
    .then((value)=>value.ok ? navigate('/home'):alert('user name already exist'))
  }

  const autoGenPassword = ()=>{
    fetch(`${API}/user/autogenpassword`)
    .then((data)=>data.json())
    .then((password)=>setGenPassword(password))
  }
  return (
    <div className="inputbox">
      <div className="input">
        <Button  onClick={()=>navigate(-1)}>back</Button>

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
 name='name'
 value={values.name}
 onChange={handleChange}
 onBlur={handleBlur}
   error = {touched.name && errors.name}
  label = 'Name'
  helperText={touched.name && errors.name ? errors.name : null}
/>
</div>
<div>
<TextField
name='email'
value={values.email}
onChange={handleChange}
onBlur={handleBlur}
  error = {touched.email && errors.email}

  label ='Email'
  helperText={touched.email && errors.email ? errors.email : null}
/>
</div>  

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

export default UserSignup
