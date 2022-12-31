import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { API } from '../global/Api';


const formValidation = yup.object({
    newname: yup
    .string()
    .required('Enter manager name'),

    newgender:yup
    .string()
    .required('select gender')
   
  
  
  })

function AdmineditHelpername() {
    const navigate = useNavigate()
    const {name,helpername,home} = useParams()


    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
      initialValues : {
         newname:'',
         newgender:''
        
          
          
      },
      validationSchema : formValidation,
  
      onSubmit : (value)=>{

     
        fetch(`${API}/admin/changehelpername/${helpername}`,{
          method :'PUT',
          body:JSON.stringify(value),
          headers:{"Content-Type":"application/json",
          admintoken: localStorage.getItem("token")}

        })
        .then((value)=>value.ok ? navigate(`/admin/${name}/${home}`) : alert('username alredy exist'))
          
          
      }
  })

  return (
    <div className='inputbox'>
      <div className='input'>
        <Button  onClick={()=>navigate(-1)}>back</Button>

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
 name='newname'
 value={values.newname}
 onChange={handleChange}
 onBlur={handleBlur}
  error ={touched.newname && errors.newname}
  id="outlined-error-helper-text"
  label = 'New manager name'
  helperText={touched.newname && errors.newname ? errors.newname : null}
/>
</div>

 

</Box>
<div>
<select id='role' 
    name='newgender'
    value={values.newgender}
    onChange={handleChange}
    onBlur={handleBlur}
    error ={touched.newgender && errors.newgender}
    required>
    <option value=''>--- Select Category---</option>
      <option value={'Female'} >Female</option>
      <option value={'Male'} >Male</option>
    </select>
    <div>
    {touched.newgender && errors.newgender ? errors.newgender : null}
    </div>
</div>
<div>
<button type="submit" className="btn btn-info">Change</button>
</div>


</form>
</div>
    </div>
  )
}

export default AdmineditHelpername