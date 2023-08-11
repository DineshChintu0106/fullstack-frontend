import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Home/Home.css'
import * as Icon from 'react-bootstrap-icons'

export default function Home() {

  const [restaurants, setRestaurants] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api')
      const data = res.data
      setRestaurants(data)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchData()
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
          <Icon.PersonCircle  height={30} width={30}/>
        </div>


      </nav>
      <div className='d-flex flex-wrap justify-content-center gap-5 pt-4 pb-4'>
        {restaurants.map((each) => {
          return (
            <div key={each._id} className='restaurant-cards'>
              <img src='https://www.washingtonian.com/wp-content/uploads/2019/06/unnamed-1-2048x1365.jpg' alt={each.Name} className='image-card' />
              <h5>{each.Name}</h5>
            </div>
          )
        })}
      </div>

    </div>
  )
}
