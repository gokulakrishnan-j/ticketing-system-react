import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate ,Link } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { API } from '../global/Api';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from '@mui/material';
import '../App.css'


const formValidation = yup.object({
    loginName: yup
    .string()
    .required('enter a username (Email)'),
    password:yup
    .string()
    .min(8,"your password must be at least 8 characters")
    .max(14, "your password must be at less then 14 characters")
    .required('enter a password'),
    role:yup
    .string()
    .required('select role')
   
    
    })

function AllLogin() {

    const navigate = useNavigate()
    const [showpassword,setShowpassword] = useState(false)

let radioButton = ''
    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
      initialValues : {
          loginName: '',
          password : '',
          role:''
         
          
          
      },
      validationSchema : formValidation,
  
      onSubmit : (value)=>{

     radioButton = value.role
       loginDetails(value)
          
          
      }
  })

  const loginDetails = (data) =>{ 
   
    fetch(`${API}/main/signin`,{
      method :'POST',
      body:JSON.stringify(data),
      headers:{"Content-Type":"application/json"}

    })
    .then((value)=>value.ok ?navigate(`/${data.role}/${data.loginName}`) : alert('invalid'))
  }
  return (
    <div>
        
    

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
 name='loginName'
 value={values.loginName}
 onChange={handleChange}
 onBlur={handleBlur}
   error = {touched.loginName && errors.loginName}

  label = 'Email'
  helperText={touched.loginName && errors.loginName ? errors.loginName : null}
/>
</div>
<div>
<TextField
name='password'
value={values.password}
onChange={handleChange}
onBlur={handleBlur}
  error = {touched.password && errors.password}
 
  label ='Password'
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

</Box>

<div>

<input 
value='student'
onChange={handleChange}
onBlur={handleBlur}
  id='student' name='role' type='radio' />
<label className='radiobutton' htmlFor='student'>Student</label>


<input 

value='helper'
onChange={handleChange}
onBlur={handleBlur}
id='helper' name='role' type='radio' />
<label className='radiobutton' htmlFor='helper'>Helper</label>


<input 

value='manager'
onChange={handleChange}
onBlur={handleBlur}
id='manager' name='role' type='radio' />
<label className='radiobutton' htmlFor='manager'>Manager</label>

</div >
<div className="radioButtonError">
{touched.role && errors.role && radioButton === '' ? errors.role : null}
</div>
<div>
<button type="submit" className="btn btn-info">Login</button>
</div>

</form>

<div>
  <Link to='/student/forgottenpassword'>
  <span>Forgotten password?</span>
  </Link>
</div>

<div className='signupButton'>
<Stack spacing={2} direction="row">
      <Button onClick={()=>navigate('/student/signup')} variant="text" sx={{color:'#CD5123',fontWeight:"bold"}}>Signup</Button>
      
    </Stack>
</div>

    </div>
  )
}

export default AllLogin
