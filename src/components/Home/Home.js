import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Home/Home.css'
import * as Icon from 'react-bootstrap-icons'
import {Link, redirect} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Home() {

  const [restaurants, setRestaurants] = useState([])
  
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api')
      const data = res.data
      setRestaurants(data)
    } catch (error) {
      console.log(error)
    }

  }

  const handleClick = (id) => {
    navigate(`/restaurant/${id}`)
  }

  useEffect(() => {
    fetchData()
    const token = Cookies.get("jwt_token")
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <div>
      <nav className='d-flex justify-content-between align-items-center navbar-top'>
        <div className='d-flex justify-content-center align-items-center gap-2 ' style={{ width: '100%' }}>
          <strong className='text-small'>Restaurants Bookings</strong>
          <div className=' dropdown-home'>
            <select className='form-control'>
              <option value={"visakhapatnam"}>Visakhapatnam</option>
            </select>
            <Icon.GeoAltFill className='icons-home' />
          </div>
          <input type='search' placeholder='search restaurants and foods here...' className='form-control form-search' />
        </div>
        <div className='d-flex gap-5'>
          <Icon.Cart height={30} width={30}/>
         <Link to={'/profile'} className='text-dark'><Icon.PersonCircle  height={30} width={30}/></Link> 
        </div>


      </nav>
      <div className='d-flex flex-wrap justify-content-center gap-5 pt-4 pb-4'>
        {restaurants.map((each) => {
          return (
            <div key={each._id} className='restaurant-cards' onClick={() => {handleClick(each._id)}}>
              <img src={each.imageUrl} alt={each.Name} className='image-card' />
              <h5>{each.Name}</h5>
            </div>
          )
        })}
      </div>

    </div>
  )
}
