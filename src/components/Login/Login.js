import React, { useState, useEffect } from 'react'
import './Login.css'
import { TextField } from '@mui/material'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


export default function Login(props) {

  const navigate = useNavigate()



  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      mobile,
      password
    }
    axios.post('https://restbook.onrender.com/login', data).then((res) => {
      if (res.data.token) {
        const jwt = res.data.token
        setLoading(false)
        Cookies.set('jwt_token', jwt, { expires: 1 })
        Cookies.set('activeUser', res.data.allData[0]._id, { expires: 1 })
        navigate('/home', { replace: true })

      }
    }).catch((err) => {
      console.log(err.response.data.message)
      if (err.response.data.message === "No user found") {
        setLoading(false)
        setError(err.response.data.message)
      } else if (err.response.data.message === "Incorrect Email or Mobile") {
        setError(err.response.data.message)
        setLoading(false)
      } else {
        setError(err.response.data.message)
        setLoading(false)
      }

    })
  }
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 20,
      }}
      spin
    />
  );

  useEffect(() => {
    const token = Cookies.get("jwt_token")
    if (!token) {
      navigate('/login')
    }
    else {
      navigate('/home')
    }
  }, [])


  return (
    <div className='home-container'>
      <form className='login-form-container' onSubmit={handleSubmit}>
        <h1 style={{ color: 'white' }}>Login</h1>
        <TextField id="Email" type='text' label="Email or Mobile" variant="standard" InputProps={{
          style: {
            color: 'white',
            borderBottom: '2px solid white'
          }
        }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' value={mobile} onChange={(e) => {
          setMobile(e.target.value)
        }} />
        <TextField id="Passeord" type='password' label="Password" variant="standard" InputProps={{
          style: {
            color: 'white',
            borderBottom: '2px solid white'
          }
        }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} />
        {error.length > 0 && <strong className='text text-danger'>{error}</strong>}
        <div style={{ width: "90%", color: "white" }} className='d-flex justify-content-end'><span>Didn't have an account <Link to={'/register'}>register</Link> here</span></div>
        <button type='submit' className='btn btn-light'>{loading ? <Spin indicator={antIcon} /> : "Login"}</button>
      </form>
    </div>
  )
}
