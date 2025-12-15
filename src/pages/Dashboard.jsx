/* eslint-disable react-refresh/only-export-components */
// toast
import { toast } from 'react-toastify';
//Components
import Intro from '../components/Intro';
//
import React from 'react'
// helper functions
import { fetchData } from '../helper'
// rrd imports
import { useLoaderData } from 'react-router-dom';
//loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    return {userName}
}

// actions
export async function dashboardAction({request}){
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName))
    return toast.success(`Welcome, ${formData.userName}`)
  } catch (error) {
    throw new error("There was a problem creating your account")
  }
}
  
const Dashboard = () => {
    const {userName} = useLoaderData()
  return (
    <div>
        {userName ? (<p>{userName}</p>) : (<Intro/>)}
        
    </div>
  )
}

export default Dashboard