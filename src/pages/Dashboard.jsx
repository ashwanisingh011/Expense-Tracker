/* eslint-disable react-refresh/only-export-components */
// toast
import { toast } from 'react-toastify';
//Components
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
//
import React from 'react'
// helper functions
import { createBudget, fetchData, wait } from '../helper'
// rrd imports
import { useLoaderData } from 'react-router-dom';
//loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return {userName, budgets}
}

// actions
export async function dashboardAction({request}){
  await wait()

  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);
  
  // new user sumbission
  if(_action === "newUser"){
      try {
    localStorage.setItem("userName", JSON.stringify(values.userName))
    return toast.success(`Welcome, ${values.userName}`)
  } catch (error) {
    throw new error("There was a problem creating your account")
  }
  }
  if(_action === "createBudget"){
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount
      })
      return toast.success("Budget created!")
    } catch (error) {
      throw new Error("There was a problem creating your budget")
    }
  }
}
  
const Dashboard = () => {
    const {userName, budgets} = useLoaderData()
  return (
    <div>
        {userName ? (<div className='dashboard'>
          <h1>Welcom back, <span className='accent'>{userName}</span></h1>
          <div className="gird-sm">
            {/* {budgets ? () : ()} */}
            <div className='grid-lg'>
              <div className="flex-lg">
                <AddBudgetForm/>
              </div>
            </div>
          </div>
        </div>) : (<Intro/>)}
        
    </div>
  )
}

export default Dashboard