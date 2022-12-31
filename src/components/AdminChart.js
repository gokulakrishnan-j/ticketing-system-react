import React, { useEffect, useState } from 'react'
import{Bar,Pie} from 'react-chartjs-2'
import { API } from '../global/Api'

function AdminChart() {
    const [helpersChart,setHelpersChat] = useState([])
    const [managersChart,setManagersChart] = useState([])
    const [usersChart,setUsersChart] = useState([])
    const [adminQuery,setAdminQuery] = useState([])
    

    useEffect(()=>{
    fetch(`${API}/admin/helpers`,{
        method :'GET',
        headers:{
          /* send a token in headers for authorization */
         admintoken: localStorage.getItem("token"),
     }
      })
      .then((data)=>data.json())
      .then((query)=>setHelpersChat(query))

      fetch(`${API}/admin/managers`,{
        method :'GET',
        headers:{
          /* send a token in headers for authorization */
         admintoken: localStorage.getItem("token"),
     }
      })
      .then((data)=>data.json())
      .then((query)=>setManagersChart(query))

      fetch(`${API}/admin/users`,{
        method :'GET',
        headers:{
          /* send a token in headers for authorization */
         admintoken: localStorage.getItem("token"),
     }
      })
      .then((data)=>data.json())
      .then((query)=>setUsersChart(query))


      fetch(`${API}/admin/query`,{
        method :'GET',
        headers:{
          /* send a token in headers for authorization */
         admintoken: localStorage.getItem("token"),
     }
      })
      .then((data)=>data.json())
      .then((query)=>setAdminQuery(query))
    },[])


const pending = adminQuery.filter((pending)=>(pending.status === "pending"))
const processing = adminQuery.filter((processing)=>(processing.status === "processing"))
const completed = adminQuery.filter((completed)=>(completed.status === "completed"))


    const helper = helpersChart
    const manager = managersChart
    const student = usersChart

    const userschartData ={
        type : 'line' ,
        labels : ['Helpers','Managers','Students'],
        
        datasets :[
            {
                label : "status",
                data : [helper.length,manager.length,student.length],
                backgroundColor: ['rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)'],
                borderColor: [
                    'black',
                    'black',
                    'black',

                  ],
                  borderWidth: 1
            }
        ]
      }

      const querychartData ={
        type : 'line' ,
        labels : ['pending','processing','completed'],
        
        datasets :[
            {
                label : "status",
                data : [pending.length,processing.length,completed.length],
                backgroundColor: ['rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)'],
                borderColor: [
                    'black',
                    'black',
                    'black',

                  ],
                  borderWidth: 1
            }
        ]
      }
  return (
    <div className='adminChart'>
            <div className='charts'>
    <div className='adminChartssysem' >
<Bar data={userschartData} />
</div>
<div  className='adminChartssysem' >
<Pie data={querychartData} />
</div>

</div>
    </div>
  )
}

export default AdminChart