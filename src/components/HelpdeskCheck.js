import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../global/Api'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

function HelpdeskCheck() {
    const {id,name} = useParams()
    const navigate = useNavigate()
    const [check,setCheck] = useState({})

    useEffect(()=>{
        fetch(`${API}/helpdesk/${id}`,{
          method :'GET',
          headers:{
            /* send a token in headers for authorization */
           helpertoken: localStorage.getItem("token"),
           
       }
        })
        .then((data)=>data.json())
        .then((details)=>setCheck(details))
      },[check,id])
  return (
    <div>
      <div><button id='backButton' type="button" onClick={()=>navigate(`/helper/${name}`)} className="btn btn-secondary">Back</button></div>
    
    <div id='createquery' className="alert alert-success" onClick={()=>navigate(check.status === "pending" ?`/helper/${name}/assign/${id}/${check.category}` : alert("already assigned"))} role="alert">
  <AddIcon/><Button>Assign</Button>
</div>

        <div>
        <div className='querDetailsToHelper'>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Ticket no :</label> <br/>{check._id}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Query created date & time :</label> <br/>{check.currentDate} <br/>{check.currentTime}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Category :</label><br/>{check.category}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Subcategory :</label><br/>{check.subcategory}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Description :</label><br/>{check.queryDescription}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Title :</label><br/>{check.queryTitle}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Language :</label><br/>{check.language}</p>
       </div>
        </div>
    </div>
  )
}

export default HelpdeskCheck