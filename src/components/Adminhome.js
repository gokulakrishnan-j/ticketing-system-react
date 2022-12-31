import React, { useState ,useEffect } from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import '../App.css'
import { API } from '../global/Api';


const heights = [235, 150, 150, 150, 150, 235, 150, 150];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Adminhome() {

    const [adminHome,setAdminHome] = useState([])
    const [helpers,setHelpers] = useState([])
    const [managers,setManagers] = useState([])
    const [users,setUsers] = useState([])

    useEffect(()=>{
        fetch(`${API}/admin/query`,{
          method :'GET',
          headers:{
            /* send a token in headers for authorization */
           admintoken: localStorage.getItem("token"),
       }
        })
        .then((data)=>data.json())
        .then((query)=>setAdminHome(query))

        fetch(`${API}/admin/managers`,{
          method :'GET',
          headers:{
            /* send a token in headers for authorization */
           admintoken: localStorage.getItem("token"),
       }
        })
        .then((data)=>data.json())
        .then((managers)=>setManagers(managers.length))

        fetch(`${API}/admin/helpers`,{
          method :'GET',
          headers:{
            /* send a token in headers for authorization */
           admintoken: localStorage.getItem("token"),
       }
        })
        .then((data)=>data.json())
        .then((helpers)=>setHelpers(helpers.length))

        fetch(`${API}/admin/users`,{
          method :'GET',
          headers:{
            /* send a token in headers for authorization */
           admintoken: localStorage.getItem("token"),
       }
        })
        .then((data)=>data.json())
        .then((users)=>setUsers(users.length))
      },[])

      

      const dateAndTime = new Date()
      const dd = dateAndTime.getDate()
    const mm = dateAndTime.getMonth()
    const yy = dateAndTime.getFullYear()
    const date = dd + '/' + (mm+1) + '/'+yy

    const todayQuerys = adminHome.filter((today)=>today.currentDate === date)
      const full = adminHome
      const pending =adminHome.filter((pending)=>pending.status === 'pending')
      const processing = adminHome.filter((processing)=>(processing.status === 'processing'))
      const completed = adminHome.filter((completed)=>(completed.status === 'completed'))
  return (
    <div className='adminHome'>
          <Box sx={{  minHeight: 'auto' }} className='detailsOfAdminHome'>
            <div  className='adminhomeboxBefore450px'>
      <Masonry columns={3} spacing={{ xs: 1, sm: 2, md: 3 }}>
        
        {heights.map((height, index) => (
          <Item key={index} sx={{ height , bgcolor:"rgb(175, 175, 175)" }}>
            
           <div >{index === 0 ?  <div className='adminHomeBox'> <div>Total Querys</div> <div> {full.length} </div></div> :null }</div>
            <div>{index === 1 ?  <div className='adminHomeBox'> <div>Total Pending</div> <div> {pending.length} </div></div> :null}</div>
            <div>{index === 3 ?  <div className='adminHomeBox'> <div>Total Processing</div> <div> {processing.length} </div></div> :null}</div>
            <div>{index === 6 ?  <div className='adminHomeBox'> <div>Total Completed</div> <div> {completed.length} </div></div>:null}</div>
            <div>{index === 5 ?  <div className='adminHomeBox'> <div>Today Querys</div> <div> {todayQuerys.length} </div></div>:null}</div>
            <div>{index === 4 ?  <div className='adminHomeBox'> <div>Total Helpers</div> <div> {helpers} </div></div>:null}</div>
            <div>{index === 7 ?  <div className='adminHomeBox'> <div>Total Managers</div> <div> {managers} </div></div>:null}</div>
            <div>{index === 2 ?  <div className='adminHomeBox'> <div>Total Users</div> <div> {users} </div></div>:null}</div>
          </Item>
        ))}
      </Masonry>
      </div>

      <div className='adminhomeboxAfter450px'>
      <Masonry  columns={2} spacing={{ xs: 1, sm: 2, md: 3 }}>
        
        {heights.map((height, index) => (
          <Item key={index} sx={{ height , bgcolor:"rgb(175, 175, 175)" }}>
            
           <div >{index === 0 ?  <div className='adminHomeBox'> <div>Total Querys</div> <div> {full.length} </div></div> :null }</div>
            <div>{index === 1 ?  <div className='adminHomeBox'> <div>Total Pending</div> <div> {pending.length} </div></div> :null}</div>
            <div>{index === 3 ?  <div className='adminHomeBox'> <div>Total Processing</div> <div> {processing.length} </div></div> :null}</div>
            <div>{index === 6 ?  <div className='adminHomeBox'> <div>Total Completed</div> <div> {completed.length} </div></div>:null}</div>
            <div>{index === 5 ?  <div className='adminHomeBox'> <div>Today Querys</div> <div> {todayQuerys.length} </div></div>:null}</div>
            <div>{index === 4 ?  <div className='adminHomeBox'> <div>Total Helpers</div> <div> {helpers} </div></div>:null}</div>
            <div>{index === 7 ?  <div className='adminHomeBox'> <div>Total Managers</div> <div> {managers} </div></div>:null}</div>
            <div>{index === 2 ?  <div className='adminHomeBox'> <div>Total Users</div> <div> {users} </div></div>:null}</div>
          </Item>
        ))}
      </Masonry>
      </div>
    </Box>
    </div>
  )
}

export default Adminhome