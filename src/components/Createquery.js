import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import '../App.css';
import createObjectURL from 'create-object-url'
import {useFormik} from 'formik';
import * as yup from 'yup';
import { API } from '../global/Api';
import { useNavigate, useParams } from 'react-router-dom';

const formValidation = yup.object({
  category : yup
  .string()
  .required('select category'),
subcategory:yup
.string()
.required('select subcategory'),

language:yup
.string()
.required('select language'),

queryTitle:yup
.string()
.required('Fill queryTitle'),

queryDescription:yup
.string()
.required('Fill queryDescription'),

timeFrom:yup
.string()
.required('Select time'),

timeTill:yup
.string()
.required('Select time'),

})

function Createquery() {
 const  navigate = useNavigate()
 const {name} = useParams()
const [category,setCategory] = useState(null)
const [showImage,setShowImage] = useState(null)


const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
    initialValues : {
        category :'',
        subcategory : '',
        language:'',
        queryTitle:'',
        queryDescription:'',
        timeFrom:'09:00',
        timeTill:'19:00',
        currentTime:'',
        currentDate :'',
        status:'',
        studentName:name
        
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
}
else if(h === 12){
  time =  h  + ':' + m  + ':'+s +' ' + 'PM'
}
else{
   time =  h -12  + ':' + m  + ':'+s +' '+ 'PM'
}

if(showImage){value.attachments= createObjectURL(showImage) }

value.currentTime = time
value.currentDate = date 

 value.status = 'pending'     
       
 createdQuerys(value)
        
        
    }
})

const createdQuerys = (data)=>{
  fetch(`${API}/user/query`,{
    method :'POST',
    body:JSON.stringify(data),
    headers:{"Content-Type":"application/json",
    usertoken: localStorage.getItem("token"),}

  })
  .then(()=>navigate(`/student/${name}`))
}
  return (
    <div >
         

    <button id='backButtonInCreatingQuery' type="button" className="btn btn-secondary" onClick={()=>navigate(-1)}>Back</button>

    <Box
    className='creatingQuery'
  
    >
      <Paper elevation={3} className='paper' >
    <form onSubmit={handleSubmit}>
       
        <div>
            {/* category*/}
    <div>
   <div className='userQuerysWidth'> <label className='queryCreatingLabel' htmlFor='Category'>Category :</label></div>
            
  <select className='inputsForCreatingQuery' id='Category' onClick={(e)=>setCategory(e.target.value)}
  name='category'
  value={values.category}
  onChange={handleChange}
  onBlur={handleBlur}
  required>
  <option value=''>--- Select Category---</option>
    <option value={'Zen-Class Doubt'} >Zen-Class Doubt</option>
    <option value={'Placement Related'} >Placement Related</option>
    <option value={'Coordination Related'} >Coordination Related</option>
    <option value={'Pre-Bootcamp Related'} >Pre-Bootcamp Related</option>
  </select>
  <div className='error'>{touched.category && errors.category ? errors.category : null}</div>
  </div>
  
  

 {/* subcategory of Zen-Class Doubt*/}
 {category === 'Zen-Class Doubt'?
  <div className='subcategory' style={{display : 'block' }}>

   
<div  className='userQuerysWidth'><label className='queryCreatingLabel' htmlFor='Subcategory'>Subcategory :</label></div>
  <select id='Subcategory' 
   name='subcategory'
   value={values.subcategory}
   onChange={handleChange}
   onBlur={handleBlur}
   className='inputsForCreatingQuery' 
  >
  <option value=''>--- Select Category---</option>
    <option value={'Task'}>Task</option>
    <option value={'WebCode'}>WebCode</option>
    <option value={'Class Topic'}>Class Topic</option>
    <option value={'Webkata'}>Webkata</option>
    <option value={'Codekata'}>Codekata</option>
    <option value={'Assessment'}>Assessment</option>
  </select>
  <div className='error'>{touched.subcategory && errors.subcategory ? errors.subcategory : null}</div>
  </div> : null
}
  {/* subcategory of Placement Related*/}
  {category === 'Placement Related'?
  <div className='subcategory' style={{display : 'block' }}>
        
        <div  className='userQuerysWidth'><label className='queryCreatingLabel' htmlFor='Subcategory'>Subcategory :</label></div>
  <select id='Subcategory' 
   name='subcategory'
   value={values.subcategory}
   onChange={handleChange}
   onBlur={handleBlur}
   className='inputsForCreatingQuery' 
  >
  <option value=''>--- Select Category---</option>
    <option value={'Company Info'}>Company Info</option>
    <option value={'Completion Certificate'}>Completion Certificate</option>
    <option value={'Portfolio'}>Portfolio</option>
  </select>
  <div className='error'>{touched.subcategory && errors.subcategory ? errors.subcategory : null}</div>
  </div> :null
}

{/* subcategory of Coordination Related*/}
{category === 'Coordination Related'?
<div className='subcategory' style={{display : 'block' }}>
        
        <div  className='userQuerysWidth'><label className='queryCreatingLabel' htmlFor='Subcategory'>Subcategory :</label></div>
  <select id='Subcategory'
   name='subcategory'
   value={values.subcategory}
   onChange={handleChange}
   onBlur={handleBlur}
   className='inputsForCreatingQuery' 
  >
  <option value=''>--- Select Category---</option>
    <option value={'Session Timing'}>Session Timing</option>
    <option value={'Session Joining Link'}>Session Joining Link</option>
    <option value={'Session Feedback'}>Session Feedback</option>
    <option value={'Completion Certificate'}>Completion Certificate</option>
    <option value={'Payment'}>Payment</option>
  </select>
  <div className='error'>{touched.subcategory && errors.subcategory ? errors.subcategory : null}</div>
  </div> : null
}

  {/* subcategory of Pre-Bootcamp Related*/}
  {category === 'Pre-Bootcamp Related'?
<div className='subcategory' style={{display : 'block' }}>
        
        <div  className='userQuerysWidth'><label className='queryCreatingLabel' htmlFor='Subcategory'>Subcategory :</label></div>
  <select id='Subcategory' 
   name='subcategory'
   value={values.subcategory}
   onChange={handleChange}
   onBlur={handleBlur}
   className='inputsForCreatingQuery' 
  >
  <option value=''>--- Select Category---</option>
    <option value={'Session'}>Session</option>
    <option value={'Payment'}>Payment</option>
    <option value={'CodeKata'}>CodeKata</option>
    <option value={'WebKata'}>WebKata</option>
    <option value={'Task'}>Task</option>
    <option value={'Other'}>Other</option>
  </select>
  <div className='error'>{touched.subcategory && errors.subcategory ? errors.subcategory : null}</div>
  </div> : null
}


 {/* Prefered Voice Communication Language */}
<div>
    
    <div  className='userQuerysWidth'><label className='queryCreatingLabel' htmlFor='Prefered Voice Communication Language'>Prefered Voice Communication Language :</label></div>
  <select id='Prefered Voice Communication Language' 
   name='language'
   value={values.language}
   onChange={handleChange}
   onBlur={handleBlur}
   className='inputsForCreatingQuery' 
  >
  <option value=''>--- Select Language---</option>
    <option value={'English'}>English</option>
    <option value={'Hindi'}>Hindi</option>
    <option value={'Tamil'}>Tamil</option>
  </select>
  <div className='error'>{touched.language && errors.language ? errors.language : null}</div>
  </div>

{/* query title */}
<div  className='userQuerysWidth'><label className='queryCreatingLabel' htmlFor='Details'>Query Title :</label></div>
<input id='Details' 
 name='queryTitle'
 value={values.queryTitle}
 onChange={handleChange}
 onBlur={handleBlur}
 className='inputsForCreatingQuery' 
/>
<div className='error'>{touched.queryTitle && errors.queryTitle ? errors.queryTitle : null}</div>
{/* Query Description */}
<div  className='userQuerysWidth'><label className='queryCreatingLabel' htmlFor='Query Description'>Query Description :</label></div>
<textarea id='Query Description' 
 name='queryDescription'
 value={values.queryDescription}
 onChange={handleChange}
 onBlur={handleBlur}
 className='inputsForCreatingQuery' 
></textarea>
<div className='error'>{touched.queryDescription && errors.queryDescription ? errors.queryDescription : null}</div>
</div>

<div>
    <div  className='userQuerysWidth'><label htmlFor='from' className='queryCreatingLabel'>Your available Time ? : ( Ours : 9:00 AM - 7:00 PM ) </label></div>

    
<div><label  htmlFor='from'>From </label></div>
<input 
 name='timeFrom'
 value={values.timeFrom}
 onChange={handleChange}
 onBlur={handleBlur}
id='from' type='time'
className='inputsForCreatingQuery'  />

<div><label htmlFor='till'>Till </label></div>
<input 
name='timeTill'
value={values.timeTill}
onChange={handleChange}
onBlur={handleBlur}
id='till' type='time' 
className='inputsForCreatingQuery' />

</div>

<div>
    <div  className='userQuerysWidth'><label htmlFor='file' className='queryCreatingLabel'>Attachments : (Optional)</label></div>
    <input type='file'  id='file'
    className='attachment'
    onChange={(e)=>setShowImage(e.target.files[0])}
    />
</div>

<div>
<button id='querySubmitButton' type="submit" className="btn btn-info">Create</button>
</div>
</form>
</Paper>
    </Box>
    </div>
  )
}

export default Createquery
