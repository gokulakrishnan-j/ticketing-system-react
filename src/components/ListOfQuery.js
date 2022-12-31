import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../global/Api'
import '../App.css'
import Brightness1Icon from '@mui/icons-material/Brightness1';


function ListOfQuery() {
 const {name} = useParams()
  const navigate = useNavigate()
  const [query,setQuery] = useState([])

  useEffect(()=>{
     
    fetch(`${API}/user/query`,{
      method :'GET',
      headers:{
        /* send a token in headers for authorization */
       usertoken: localStorage.getItem("token"),
       
   }
    })
    .then((data)=>data.json())
    .then((querys)=>setQuery(querys.reverse()))
  },[query])

 
  return (
    <div>
      <div className='listofquerysBefore450px'>
      {query.map((n,index)=>(
        n.studentName === name?
        <div id='querys' className="alert alert-secondary" role="alert"
        key={index}
        onClick={()=>navigate(`/student/${name}/${n._id}`)}>
          <div className='leftQuery'>
  <h5 className='ticket'>{n._id}
  <span className='userQueryTitle'>- {n.queryTitle}</span>
  </h5>
 
  <div id='category' className="alert alert-warning" role="alert">
  <h6 className='categorysName'>{n.category}</h6>
  </div>
  </div>
  <div className='rightQuery'>
  <h5 className='dateAndTime'>{n.currentDate}<br/>{n.currentTime}</h5>
  <h5 className='status'>{n.status}</h5> <Brightness1Icon sx={{color: n.status === "pending"?"#F51717":null || n.status === "processing"?"#F9FC25" :  null || n.status === "completed" ?"#3DDC0B" :null}}/>
  </div>
  
</div>:null
))}</div>

<div className='listofquerysAfter450px'>{query.map((n,index)=>(
        n.studentName === name?
        <div id='querys' className="alert alert-secondary" role="alert"
        key={index}
        onClick={()=>navigate(`/student/${name}/${n._id}`)}>
          <div className='leftQuery'>
  <h5 className='ticket'>{n._id}
  <span className='userQueryTitle'>- {n.queryTitle}</span>
  </h5>
  
  <div className='rightQuery'>
  <div id='category' className="alert alert-warning" role="alert">
  <h6 className='categorysName'>{n.category}</h6>
  </div>
  
  <div>
  <p className='dateAndTime'>{n.currentDate}-{n.currentTime}</p>
  <p className='status'>{n.status} <Brightness1Icon sx={{color: n.status === "pending"?"#F51717":null || n.status === "processing"?"#F9FC25" :  null || n.status === "completed" ?"#3DDC0B" :null}}/></p> 
  </div>
  </div>
  </div>
</div>:null
))}</div>

    </div>
  )
}

export default ListOfQuery