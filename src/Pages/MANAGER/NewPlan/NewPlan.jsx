import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar';
import NavbarComponent from '../../../components/Navbar/Navbar';
import NewTaskTable from '../components/NewTaskTable';
import axios from 'axios';
import dayjs from 'dayjs';

const NewPlan = () => {
    const [pendingRequirmentList,setPendingRequirmentList]=useState([]);


    useEffect(()=>{
        fetchPendingTasks();
    },[])



   
    const fetchPendingTasks=async()=>{
        try {
            const results=await axios.get("http://localhost:5000/api/manager/pendingTasks")
            console.log("results ",results);
            const finalTaskArray=results.data?.map((res)=>({
                ...res,
                startDate:dayjs(res?.startDate).format("YYYY-MM-DD"),
                endDate:dayjs(res?.endDate).format("YYYY-MM-DD")
            }))

            setPendingRequirmentList(finalTaskArray);
        } catch (error) {
            console.log("pending tasks fetching error! ",error);
        }
    }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <NewTaskTable fetchPendingTasks={fetchPendingTasks} reservationResult={pendingRequirmentList}/>
        {/* <NavbarComponent /> */}
        
      </div>
    </div>
  )
}

export default NewPlan