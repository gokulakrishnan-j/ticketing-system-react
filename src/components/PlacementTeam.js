import React ,{useState,useEffect} from 'react'
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { API } from '../global/Api';
import{Doughnut} from 'react-chartjs-2'
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function PlacementTeam() {
    const navigate = useNavigate()
    const {name} = useParams()
    const [querys,setQuerys] = useState([])
    useEffect(()=>{
        fetch(`${API}/management/query`,{
          method :'GET',
          headers:{
            /* send a token in headers for authorization */
           managertoken: localStorage.getItem("token"),
           
       }
        })
        .then((data)=>data.json())
        .then((query)=>setQuerys(query.reverse()))
       },[])

       

       const dateAndTime = new Date()
       const dd = dateAndTime.getDate()
     const mm = dateAndTime.getMonth()
     const yy = dateAndTime.getFullYear()
     const date = dd + '/' + (mm+1) + '/'+yy
 
        const length = querys.filter((len)=>(len.currentDate === date && len.team === "Placement Team"))
     const processing = querys.filter((processing)=>(processing.status === 'processing' && processing.team === "Placement Team"))
     const completed = querys.filter((completed)=>(completed.status === 'completed'  && completed.team === "Placement Team"))
 
  const chartData ={
   type : 'line' ,
   labels : ['pending','completed'],
   
   datasets :[
       {
           label : "status",
           data : [processing.length,completed.length],
           backgroundColor: ['#EB2A2A','#40D817'],
       }
   ]
 }
  return (
    <div>
        
 <div className='charts'>
    <div  className='helperChart'>
       
<Doughnut data={chartData} /> 

</div>

<div  className='todyQuerys'>
<Card sx={{bgcolor:"#d6d6d690", borderRadius: "12px"}}>
      <CardContent>
      <h4 className='todayQuerysTitle'>Today Querys</h4>
        <h1 className='todayQuerysTitle'>{length.length}</h1>
      </CardContent>

    </Card>
</div>
</div> 
<div className='helperQueryList'>
<div className='listofquerysBefore450px'>
        {querys.map((n,index)=>(
  n.status !== 'pending' && n.team === 'Placement Team' ?
        <div id='helperQuerys' className="alert alert-secondary" role="alert"
        key={index}
        onClick={()=>navigate(`/manager/${name}/${n._id}`)}
        >
          <div className='leftQuery'>
  <h5 className='ticket'>{n._id}
  <span className='userQueryTitle'>- {n.queryTitle}</span>
  </h5>
 
  <div id='category' className="alert alert-warning" role="alert">
  <div className='categorysName'>{n.category} </div> 
  <div>
     <Brightness1Icon sx={{color:n.status === 'completed' ? "#4AE211" :"#E72D1A"}}/>
     </div>
  </div>
  </div>
  <div className='rightQuery'>
  <h5 className='dateAndTime'>{n.currentDate}<br/>{n.currentTime}</h5>
  <h5 className='status'>{n.status}</h5>
  </div>

  
  
</div> :null
))}
</div>
<div className='listofquerysAfter450px'>
{querys.map((n,index)=>(
  n.status !== 'pending' && n.team === 'Placement Team' ?
        <div id='helperQuerys' className="alert alert-secondary" role="alert"
        key={index}
        onClick={()=>navigate(`/manager/${name}/${n._id}`)}
        >
          <div className='leftQuery'>
  <h5 className='ticket'>{n._id}
  <span className='userQueryTitle'>- {n.queryTitle}</span>
  </h5>
  <div className='rightQuery'>
  <div id='category' className="alert alert-warning" role="alert">
  <div className='categorysName'>{n.category} </div> 
  <div>
     <Brightness1Icon sx={{color:n.status === 'completed' ? "#4AE211" :"#E72D1A"}}/>
     </div>
  </div>
  </div>
  <div>
  <h5 className='dateAndTime'>{n.currentDate}<br/>{n.currentTime}</h5>
  <h5 className='status'>{n.status}</h5>
  </div>
  </div>

  
  
</div> :null
))}
</div>
</div>
    </div>
  )
}

export default PlacementTeam