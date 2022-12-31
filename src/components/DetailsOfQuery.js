import React, { useState ,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../global/Api'

function DetailsOfQuery() {
  const navigate = useNavigate()
    const {id} = useParams()
    const [details,setDetails] = useState({})
    const [commands,setCommands] = useState([])

    useEffect(()=>{
        fetch(`${API}/user/query/${id}`,{
          method :'GET',
          headers:{
            /* send a token in headers for authorization */
           usertoken: localStorage.getItem("token"),
           
       }
        })
        .then((data)=>data.json())
        .then((details)=>setDetails(details))
      },[id])

      useEffect(()=>{
        fetch(`${API}/all/command/${id}`,{
          method :'GET',
          headers:{
            /* send a token in headers for authorization */
           usertoken: localStorage.getItem("token"),
           
       }
        })
        .then((data)=>data.json())
        .then((value)=>setCommands(value))
    },[id])
  return (
    <div>
      <div><button id='backButton' type="button" onClick={()=>navigate(-1)} className="btn btn-secondary">Back</button></div>
        <div className='detailsOfUserQuery'>
          <div className='querDetailsOfuserSide'>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Ticket no :</label> <br/>{details._id}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Query created date & time :</label> <br/>{details.currentDate} <br/>{details.currentTime}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Category :</label><br/>{details.category}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Subcategory :</label><br/>{details.subcategory}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Description :</label><br/>{details.queryDescription}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Title :</label><br/>{details.queryTitle}</p>
        <p className='UserQueryContents'><label className='labelForDetailsOfQuery'>Language :</label><br/>{details.language}</p>
        
       </div>
       <div  className='querDetailsOfManagerSide'>
       <div><label>Student solution</label></div>
          {commands.map((n,index)=>(
            <div key={index}>
              <div>
            
            <p className='commandFromManagerToUser' key={index}>{n.command}</p>
            </div>
            </div>
          ))}
          
        </div>
        </div>
        
    </div>
  )
}

export default DetailsOfQuery