import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import axios from 'axios'

function Dashboard() {

  const [loginfeedback, setLoginfeedback ] = useState()
  const navigate = useNavigate()
  const backendUrl = process.env.REACT_APP_BACKEND_URL; // coming from .env file
  axios.defaults.withCredentials = true; //important
  useEffect(()=> {
    //  axios.get('http://localhost:3001/dashboard')
      axios.get(`${backendUrl}/dashboard`)
      .then(res => {
          console.log(res.data);
          if(res.data.role === "admin") {
            setLoginfeedback(res.data.email + " Logged In Successfully")
          } else {
              navigate('/')
          }
      }).catch(err => console.log(err))
  }, [])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 my-dashboard">
      <div className="mb-3">
      <h1>Dashboard</h1>
      <p>{loginfeedback}</p>
      </div>
    </div>
  )
}

export default Dashboard
