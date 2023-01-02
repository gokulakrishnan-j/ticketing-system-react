import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { API } from '../global/Api';

const formValidation = yup.object({
  name: yup
  .string()
  .required('Enter manager name'),
  managername : yup
  .string()
  .required('Enter user name of manager'),
password:yup
.string()
.min(8,"your password must be at least 8 characters")
.max(14, "your password must be at less then 14 characters")
.required('create a password'),

position:yup
.string()
.required('select role'),

gender:yup
.string()
.required('select gender')


})



function CreatingNewManager() {
    const navigate = useNavigate()
    const {name,home} = useParams()


    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
      initialValues : {
         name:'',
          managername: '',
          password : '',
          role: 'manager',
          position: '',
          createdDate:'',
          createdTime: '',
            gender : ''
          
          
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
     
        fetch(`${API}/admin/managersignup`,{
          method :'POST',
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
 name='name'
 value={values.name}
 onChange={handleChange}
 onBlur={handleBlur}
  error ={touched.name && errors.name}
  id="outlined-error-helper-text"
  label = 'Full name'
  helperText={touched.name && errors.name ? errors.name : null}
  
/>
</div>
<div>
<TextField
 name='managername'
 value={values.managername}
 onChange={handleChange}
 onBlur={handleBlur}
  error ={touched.managername && errors.managername}
  id="outlined-error-helper-text"
  label = 'Username'
  helperText={touched.managername && errors.managername ? errors.managername : null}
  
/>
</div>
<div >
<TextField
name='password'
value={values.password}
onChange={handleChange}
onBlur={handleBlur}
  error = {touched.password && errors.password}
  id="outlined-error-helper-text"
  label ='password'
  helperText={touched.password && errors.password ? errors.password : null}
  
/>
</div>  

</Box>

<div>
<div> <label htmlFor='role'>Role</label></div>
    
    <select id='role' 
    name='position'
    value={values.position}
    onChange={handleChange}
    onBlur={handleBlur}
    error ={touched.position && errors.position}
    required>
    <option value=''>--- Select Category---</option>
      <option value={'Zen-Class team'} >Zen-Class Team</option>
      <option value={'Placement team'} >Placement Team</option>
      <option value={'Coordination team'} >Coordination Team</option>
      <option value={'Pre-Bootcamp team'} >Pre-Bootcamp Team</option>
    </select>
    <div>
    {touched.position && errors.position ? errors.position : null}
    </div>
</div>

<div>
<div> <label htmlFor='role'>Gender</label></div>
    
    <select id='role' 
    name='gender'
    value={values.gender}
    onChange={handleChange}
    onBlur={handleBlur}
    error ={touched.gender && errors.gender}
    required>
    <option value=''>--- Select Category---</option>
      <option value={'Female'} >Female</option>
      <option value={'Male'} >Male</option>
    </select>
    <div>
    {touched.gender && errors.gender ? errors.gender : null}
    </div>
</div>
<div>
<button type="submit" className="btn btn-info">Create</button>
</div>

</form>
</div>
    </div>
  )
}

export default CreatingNewManager
