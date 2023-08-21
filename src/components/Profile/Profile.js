import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import './Profile.css'

export default function Profile() {

  const [user, setUser] = useState({})
  const [address, setAddress] = useState({})

  const fetchDetails = () => {
    const user = Cookies.get("activeUser")
    axios.get(`https://restbook.onrender.com/getProfile/${user}`).then((res) => {
      console.log(res)
      setUser(res.data)
      setAddress(res.data.address)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  const navigate = useNavigate()
  const handleLogout = () => {
    Cookies.remove("jwt_token")
    Cookies.remove("activeUser")
    navigate('/login', { replace: true })
  }

  const { street, doorNo, mandal, city, pincode } = address

  return (
    <div>
      <h1>Profile</h1>
      <div className='profile-card'>
        <div className='d-flex justify-content-between border-b'>
          <b>Username:</b><p>{user.username}</p>
        </div>
        <div className='d-flex justify-content-between border-b'>
          <b>Email:</b><p>{user.email}</p>
        </div>
        <div className='d-flex justify-content-between border-b'>
          <b>Mobile:</b><p>{user.mobile}</p>
        </div>
        <div className='d-flex justify-content-between border-b'>
          <b>Address:</b><p className='text-end'>{doorNo},{street},{mandal},{city},{pincode}</p>
        </div>
        <div className='border-b'>
          <b>Change Password</b>
        </div>
        <div className='border-b'>
          <Link to={'/cart'} style={{textDecoration:"none",color:"black"}}><b>Cart</b></Link>
        </div>
        <div className='border-b'>
          <b>My Orders</b>
        </div>
        <div className='border-b'>
          <b>Contact US</b>
        </div>
        <div>
          <b>About</b>
        </div>

      </div>
      <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
    </div>
  )
}
