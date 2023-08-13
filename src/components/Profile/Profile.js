import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Profile() {
    const navigate = useNavigate()
const handleLogout = () => {
  Cookies.remove("jwt_token")
  navigate('/login',{replace:true})
}

  return (
    <div>
      <h1>Profile</h1>
      <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
    </div>
  )
}
