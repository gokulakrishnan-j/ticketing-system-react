import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { API } from '../global/Api'
import { useNavigate, useParams } from 'react-router-dom'

const formValidation = yup.object({
    team: yup
    .string()
    .required('select category'),
  
  })

function AssigneingToManager() {
    const navigate = useNavigate()
    const {name} = useParams()
    const {id,category} = useParams()
    
    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
        initialValues : {
            team : category === 'Zen-Class Doubt' ? 'Zen-Class Team':null || category === 'Placement Related' ? 'Placement Team':null 
            || category === 'Coordination Related' ? 'Coordination Team':null || category === 'Pre-Bootcamp Related' ? 'Pre-Bootcamp Team':null,
            status : 'processing'
        },
        validationSchema : formValidation,
    
        onSubmit : (value)=>{
    
           
            fetch(`${API}/helpdesk/assign/${id}`,{
              method :'PUT',
              body:JSON.stringify({assigedhelpername:name,value}),
              headers:{"Content-Type":"application/json",
              helpertoken: localStorage.getItem("token")}
    
            })
            .then(()=>navigate(`/helper/${name}`))
            
        }
    })
  return (
    <div className='assignToManager'>
       
        <div className='assignToManagerInput'> 
        <div><button id='backButton' type="button" onClick={()=>navigate(-1)} className="btn btn-secondary">Back</button></div>
        <form onSubmit={handleSubmit}>
        <div>Assign To</div>
        <div>
           
    <div>
   <div> <label htmlFor='Managements'>Managements</label></div>
            
  <select id='Managements'
  className='helperAssignInputBox'
  name='team'
  value={values.team}
  onChange={handleChange}
  onBlur={handleBlur}
  required>
  <option value=''>--- Select Category---</option>
    <option value={'Zen-Class Team'} >Zen-Class Team</option>
    <option value={'Placement Team'} >Placement Team</option>
    <option value={'Coordination Team'} >Coordination Team</option>
    <option value={'Pre-Bootcamp Team'} >Pre-Bootcamp Team</option>
  </select>
  {touched.team && errors.team ? errors.team : null}
  </div>
  </div>

  <div>
<button type="submit" className="btn btn-info">Assign</button>
</div>
  </form>
  </div>
    </div>
  )
}

export default AssigneingToManager