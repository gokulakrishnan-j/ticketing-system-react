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
    adminname : yup
    .string()
    .required('enter a admin name'),
    password:yup
    .string()
    .min(8,"your password must be at least 8 characters")
    .max(14, "your password must be at less then 14 characters")
    .required('enter a password'),
   
    
    })

function AdminLogin() {

    const navigate = useNavigate()
    const [showpassword,setShowpassword] = useState(false)

    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
      initialValues : {
          adminname: '',
          password : '',
         
          
          
      },
      validationSchema : formValidation,
  
      onSubmit : (value)=>{
 adminData(value)
          
      }
  })

  const adminData = (data)=>{
    fetch(`${API}/admin/signin`,{
      method :'POST',
      body:JSON.stringify(data),
      headers:{"Content-Type":"application/json"}

    })
    .then((value)=>value.ok ?navigate(`/admin/${data.adminname}/home`) :alert('invalid'))
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
className='adminlogininputfeild'
>


<div>
<TextField
 name='adminname'
 value={values.adminname}
 onChange={handleChange}
 onBlur={handleBlur}
   error = {touched.adminname && errors.adminname}
 
  label = 'Admin@name'
  helperText={touched.adminname && errors.adminname ? errors.adminname : null}
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
<button type="submit" className="btn btn-info">Login</button>
</div>



</form>

<div>
  <Link to='/admin/forgottenpassword'>
  <span>Forgotten password?</span>
  </Link>
</div>

<div className='signupButton'>
<Stack spacing={2} direction="row">
      <Button onClick={()=>navigate('/admin/signup')} variant="text" sx={{color:'#CD5123',fontWeight:"bold"}}>Signup</Button>
      
    </Stack>
</div>

    </div>
  )
}

export default AdminLogin