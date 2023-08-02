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
        <div className='d-flex justify-content-center gap-3' style={{ width: '100%' }}>
          <div className='d-flex flex-column align-items-center gap-3' style={{ width: '100%' }}>
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
            <TextField id="AltMobile" type='text' label="Alternate Mobile" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white',
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => { setAddress(e.target.value) }} value={address} />
          </div>
          <div className='d-flex flex-column gap-3 align-items-center' style={{ width: '100%' }}>
            <TextField id="DrNo" type='text' label="Door No" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white'
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => { setUsername(e.target.value) }} value={username} />
            <TextField id="Street" type='text' label="Street Name" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white'
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => { setEmail(e.target.value) }} value={email}
            />
            <TextField id="Mandal" type='text' label="Mandal" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white'
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => { setPassword(e.target.value) }} value={password} />
            <TextField id="City" type='text' label="City" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white',
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => { setAddress(e.target.value) }} value={address} />
            <TextField id="Pincode" type='number' label="Pincode" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white',
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => { setMobile(e.target.value) }} value={mobile} />

          </div>
        </div>


        {success.length > 0 && <strong className='text-success'>{success}<Link to={'/login'}>login</Link> to continre</strong>}
        <button type='submit' className='btn btn-light mt-3' style={{ backgroundColor: 'white' }}>{loading ? "loading..." : "Submit"}</button>
      </form>
    </div>
  )
}
