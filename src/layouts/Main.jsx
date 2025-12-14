/* eslint-disable react-refresh/only-export-components */
import React from 'react'
// helper functions
import { fetchData } from '../helper'
// rrd imports
import { Outlet, useLoaderData } from 'react-router-dom';
// assets
import wave from "../assets/wave.svg"
// components
import Nav from '../components/Nav';

export function mainLoader(){
    const userName = fetchData("userName");
    return {userName}
}
const Main = () => {
    const {userName} = useLoaderData()
  return (
    <div className='layout'>
        <Nav userName={userName}/>
        <main>
            <Outlet/>
        </main>
        <img src={wave} alt="" srcset="" />
    </div>
  )
}

export default Main