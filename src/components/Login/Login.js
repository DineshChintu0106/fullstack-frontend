import React, { useState } from 'react'
import './Login.css'
import { TextField } from '@mui/material'
import axios from 'axios'

export default function Login() {

  const [mobile,setMobile] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      mobile,
      password
    }
    axios.post('http://localhost:4000/login',data).then((res) => {
      console.log(res)
      if (res.statusText === "OK") {
        
      }
    })
  }

  return (
    <div className='home-container'>
      <form className='d-flex flex-column gap-3 login-form-container' onSubmit={handleSubmit}>
        <h1 style={{color:'white'}}>Login</h1>
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
        <button type='submit' className='btn btn-light'>Login</button>
      </form>
    </div>
  )
}
