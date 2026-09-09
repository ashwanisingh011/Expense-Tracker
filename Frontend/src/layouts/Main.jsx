/* eslint-disable react-refresh/only-export-components */
import React from 'react'
// helper functions
// import { fetchData } from '../helper'
// rrd imports
import { Outlet, useLoaderData, useLocation } from 'react-router-dom';
// assets
import wave from "../assets/wave.svg"
// components
import Nav from '../components/Nav';

export function mainLoader(){
    const userNameString = localStorage.getItem("userName");
    const userName = userNameString ? JSON.parse(userNameString) : null;
  return { userName }
}

export async function mainAction() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  return null;
}
const Main = () => {
    const {userName} = useLoaderData()
    const location = useLocation()
    const isLoginPage = !userName && location.pathname === "/"
  return (
    <div className={`layout ${isLoginPage ? 'layout--login' : ''}`}>
        <Nav userName={userName}/>
        <main>
            <Outlet/>
        </main>
        <img src={wave} alt="" className="wave-img" />
    </div>
  )
}

export default Main