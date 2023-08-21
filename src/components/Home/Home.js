import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Home/Home.css'
import * as Icon from 'react-bootstrap-icons'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Home() {

  const [restaurants, setRestaurants] = useState([])
  const [filtered, setFiltered] = useState(restaurants)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()


  const fetchData = async () => {
    try {
      const res = await axios.get('https://restbook.onrender.com/api')
      const data = res.data
      setRestaurants(data)
      setFiltered(data)
    } catch (error) {
      console.log(error)
    }

  }

  const handleClick = (id) => {
    navigate(`/restaurant/${id}`)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
    if (e.target.value === "") {
      setFiltered(restaurants)
    } else {
      const filter = restaurants.filter((each) => each.Name.toLowerCase().includes(e.target.value.toLowerCase()))
      setFiltered(filter)
      if (filter.length === 0) {
        setMessage("No restaurants found")
      } else {
        setMessage('')
      }
    }
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
          <input type='search' placeholder='search restaurants and foods here...' value={search} className='form-control form-search' onChange={handleChange} />
        </div>
        <div className='d-flex gap-5'>
          <Link to={'/cart'}><Icon.Cart height={30} width={30}/></Link>
         <Link to={'/profile'} className='text-dark'><Icon.PersonCircle  height={30} width={30}/></Link> 
        </div>
      </nav>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{width:"100%"}}>
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav> */}
      <div className='d-flex flex-wrap justify-content-center gap-5 pt-4 pb-4'>
        <nav className="navbar navbar-light"></nav>
        {filtered.map((each) => {
          return (
            <div key={each._id} className='restaurant-cards' onClick={() => { handleClick(each._id) }}>
              <img src={each.imageUrl} alt={each.Name} className='image-card' />
              <h5>{each.Name}</h5>
            </div>
          )
        })}
        {message.length > 0 && <h1>{message}</h1>}
      </div>

    </div>
  )
}
