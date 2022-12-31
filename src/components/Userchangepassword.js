import React,{useState} from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../global/Api';
import Button from '@mui/material/Button';



const formValidation = yup.object({
    password:yup
    .string()
    .min(8,"your password must be at least 8 characters")
    .max(14, "your password must be at less then 14 characters")
    .required('create a password'),
    newpassword:yup
    .string()
    .min(8,"your password must be at least 8 characters")
    .max(14, "your password must be at less then 14 characters")
    .required('create a password'),
   
    
    })

function Userchangepassword() {
    const {name} =useParams()
    const navigate = useNavigate()
    const [showpassword,setShowpassword] = useState(false)
    const [showNewpassword,setShowNewpassword] = useState(false)

    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
        initialValues : {
            email: name,
            password : '',
           newpassword:'',
            
        },
        validationSchema : formValidation,
    
        onSubmit : (value)=>{

  
  changePassword(value)
    
        }
    })
const changePassword = (data)=>{
    fetch(`${API}/User/newpassword/${name}`,{
        method :'PUT',
        body:JSON.stringify(data),
        headers:{"Content-Type":"application/json"}
      })
      .then((value)=>value.ok ? navigate(`/student/${name}`):alert('Old password is wrong'))
}
  return (
    <div className='inputbox'>
       <div className='input'>
       <Button  onClick={()=>navigate(-1)} sx={{bgcolor:"#3A3635"}}>back</Button>
        <form onSubmit={handleSubmit}>
<Box
component="form"
sx={{
'& .MuiTextField-root': { m: 1, },
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
  label ='Old password'
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
name='newpassword'
value={values.newpassword }
onChange={handleChange}
onBlur={handleBlur}
error = {touched.newpassword && errors.newpassword}
  label ='New password'
  type = {showNewpassword ?"text":"password"}
  helperText={touched.newpassword && errors.newpassword ? errors.newpassword : null}
  InputProps={{
    endAdornment: (
      <InputAdornment position="start">
       {showNewpassword ? <VisibilityIcon onClick={()=>setShowNewpassword(false)}/> : < VisibilityOffIcon onClick={()=>setShowNewpassword("true")} />}
      </InputAdornment>
     )
    }}
/> 

</div>

</Box>

<div>
<button type="submit" className="btn btn-info">Create</button>
</div>

</form>
</div>
    </div>
  )
}

export default Userchangepassword