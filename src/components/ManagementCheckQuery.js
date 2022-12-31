import React ,{useState ,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../global/Api'
import CommandBox from './CommandBox';
import '../App.css'
import { Button } from '@mui/material';

function ManagementCheckQuery() {
  const navigate = useNavigate()
    const {name,id} = useParams()
    const [details,setDetails] = useState({})

    useEffect(()=>{
        fetch(`${API}/management/${id}`,{
          method :'GET',
          headers:{
            /* send a token in headers for authorization */
           managertoken: localStorage.getItem("token"),
           
       }
        })
        .then((data)=>data.json())
        .then((details)=>setDetails(details))
      },[id])

      const inputForEmail=()=>{
       var contentForEmail =  prompt("Want to sent Email")
       completed(contentForEmail)
      }

   function completed (content){
        fetch(`${API}/management/assign/${id}`,{
          method :'PUT',
          body:JSON.stringify({completedmanagername:name,
            emailcontent : content,
            status : 'completed',
        details}),
          headers:{"Content-Type":"application/json",
          managertoken: localStorage.getItem("token")}

        })
        .then(()=>navigate(`/manager/${name}`))
      }
  return (
    <div>

<div><button id='backButton' type="button" onClick={()=>navigate(-1)} className="btn btn-secondary">Back</button></div>

    <div id='createquery' className="alert alert-success" role="alert">
 <Button onClick={()=>{details.status === "processing" ? inputForEmail():alert("already assigned")}}><div className='managerAssignAsCompleted'>Assign as completed</div></Button>
</div>
 <div className='commandBoxAndQueryDetail'>
        <div className='managerQueryDetails'>
        <div className='querDetailsToHelper'>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Ticket no :</label> <br/>{details._id}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Query created date & time :</label> <br/>{details.currentDate} <br/>{details.currentTime}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Category :</label><br/>{details.category}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Subcategory :</label><br/>{details.subcategory}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Description :</label><br/>{details.queryDescription}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Title :</label><br/>{details.queryTitle}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Language :</label><br/>{details.language}</p>
       </div>

       
        </div>
      <div className='commandBox'>
        <CommandBox/>
      </div>
      </div>
    </div>
  )
}

export default ManagementCheckQuery