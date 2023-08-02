import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';

export default function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')


  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      username,
      email,
      password,
      address,
      mobile
    }
    axios.post("http://localhost:4000/api/data", data).then((res) => {
      console.log(res)
    }).then(() => {
      setLoading(false)
      setSuccess("Registerd successfully")
      setUsername('')
      setEmail('')
      setPassword('')
      setAddress('')
      setMobile("")
    }).catch(err => console.log(err))
  }
  return (
    <div className='register-container'>
      <form className='form-register' onSubmit={handleClick}>
        <h1>Sign UP</h1>
        <TextField id="username" type='text' label="Username" variant="standard" InputProps={{
          style: {
            color: 'white',
            borderBottom: '2px solid white'
          }
        }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => { setUsername(e.target.value) }} value={username} />
        <TextField id="email" type='email' label="Email" variant="standard" InputProps={{
          style: {
            color: 'white',
            borderBottom: '2px solid white'
          }
        }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => { setEmail(e.target.value) }} value={email}
        />
        <TextField id="password" type='password' label="Password" variant="standard" InputProps={{
          style: {
            color: 'white',
            borderBottom: '2px solid white'
          }
        }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => { setPassword(e.target.value) }} value={password} />
        <TextField id="mobile" type='number' label="Mobile" variant="standard" InputProps={{
          style: {
            color: 'white',
            borderBottom: '2px solid white',
          }
        }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => { setMobile(e.target.value) }} value={mobile} />
        <TextField id="adderss" type='text' label="Address" variant="standard" InputProps={{
          style: {
            color: 'white',
            borderBottom: '2px solid white',
          }
        }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => { setAddress(e.target.value) }} value={address} />

        {success.length > 0 && <strong className='text-success'>{success}<Link to={'/login'}>login</Link> to continre</strong>}
        <button type='submit' className='btn btn-light mt-3' style={{ backgroundColor: 'white' }}>{loading ? "loading..." : "Submit"}</button>
      </form>
    </div>
  )
}
