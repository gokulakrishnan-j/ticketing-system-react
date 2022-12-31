import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { API } from '../global/Api';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const formValidation = yup.object({
    email : yup
    .string()
    .email("Enter valid email")
    .required('enter a admin name'),
   
    
    })

function Userforgottenpassword() {
const navigate = useNavigate()
    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
        initialValues : {
            email:''
            
            
        },
        validationSchema : formValidation,
    
        onSubmit : (value)=>{
           
  
            fetch(`${API}/user/forgottenpassword/${value.email}`,{
                method :'POST',
                body:JSON.stringify(value),
                headers:{"Content-Type":"application/json",}
      
              })
              .then((value)=>value.ok ?navigate(`/home`) :alert('invalid email'))
                
            
        }
    })

  return (
    <div className='inputbox'>
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
 name='email'
 value={values.email}
 onChange={handleChange}
 onBlur={handleBlur}
   error = {touched.email && errors.email}

  label = 'Email'
  helperText={touched.email && errors.email ? errors.email : null}
/>
</div>


</Box>
<div>
<button type="submit" className="btn btn-info">Send</button>
</div>
</form>
</div>
    </div>
  )
}

export default Userforgottenpassword