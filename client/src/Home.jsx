import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import axios from 'axios'

function Home() {
  const navigate = useNavigate()
  const backendUrl = process.env.REACT_APP_BACKEND_URL; // coming from .env file
  // console.log(process.env.REACT_APP_BACKEND_URL)
  
  axios.defaults.withCredentials = true; //important

  const handleLogout = () => {
  
   axios.get(`${backendUrl}/logout`) // Be careful about backtik. Ingeneral it is 'http://localhost:3001/logout'
    .then(res => {
      console.log(res.data)
        if(res.data === "Success")
        navigate('/login')
    }).catch(err => console.log(err))
   }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 my-custom-div">
       <div className="mb-3">
       <h1>Home</h1>
       <input type="button" onClick={handleLogout} value="Logout" className='btn_input'/>
      </div>
      
    </div>
  )
}

export default Home
