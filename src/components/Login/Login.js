import React, { useState } from 'react'
import './Login.css'
import { TextField } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {

  const navigate = useNavigate()

  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      mobile,
      password
    }
    axios.post('http://localhost:4000/login', data).then((res) => {
      console.log(res)
      if (res.statusText === "OK") {
        navigate('/home',{replace:true})
      }
    }).catch((err) => {
      console.log(err.response.data.message)
      if (err.response.data.message === "No user found") {
        setError(err.response.data.message)
      } else if (err.response.data.message === "Incorrect Email or Mobile") {
        setError(err.response.data.message)
      } else {
        setError(err.response.data.message)
      }

    })
  }

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
        <button type='submit' className='btn btn-light'>Login</button>
      </form>
    </div>
  )
}
