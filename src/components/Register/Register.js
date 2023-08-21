import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';

export default function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [altMobile, setAltMobile] = useState('')
  const [doorNo, setDoorNo] = useState('')
  const [street, setStreet] = useState('')
  const [mandal, setMandal] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')


  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      username,
      email,
      password,
      mobile,
      altMobile,
      doorNo,
      street,
      mandal,
      city,
      pincode
    }
    axios.post("https://restbook.onrender.com/register", data).then((res) => {
      setSuccess("Registerd successfully")
    }).then(() => {
      setLoading(false)
      setUsername('')
      setEmail('')
      setPassword('')
      setAltMobile('')
      setMobile("")
      setDoorNo('')
      setStreet('')
      setMandal('')
      setCity('')
      setPincode('')
    }).catch(err => {
      if (err.response.status === 409) {
        setError(err.response.data)
        setLoading(false)
      }
    })
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
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => {
              setUsername(e.target.value)
              setError('')
              setSuccess('')
            }} value={username} />
            <TextField id="email" type='email' label="Email" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white'
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => {
              setEmail(e.target.value)
              setError('')
              setSuccess('')
            }} value={email}
            />
            <TextField id="password" type='password' label="Password" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white'
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => {
              setPassword(e.target.value)
              setError('')
              setSuccess('')
            }} value={password} />
            <TextField id="mobile" type='tel' label="Mobile" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white',
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => {
              setMobile(e.target.value)
              setError('')
              setSuccess('')
            }} value={mobile} />
            <TextField id="AltMobile" type='text' label="Alternate Mobile" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white',
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => {
              setAltMobile(e.target.value)
              setError('')
              setSuccess('')
            }} value={altMobile} />
          </div>
          <div className='d-flex flex-column gap-3 align-items-center' style={{ width: '100%' }}>
            <TextField id="DrNo" type='text' label="Door No" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white'
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => {
              setDoorNo(e.target.value)
              setError('')
              setSuccess('')
            }} value={doorNo} />
            <TextField id="Street" type='text' label="Street Name" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white'
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => {
              setStreet(e.target.value)
              setError('')
              setSuccess('')
            }} value={street}
            />
            <TextField id="Mandal" type='text' label="Mandal" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white'
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => {
              setMandal(e.target.value)
              setError('')
              setSuccess('')
            }} value={mandal} />
            <TextField id="City" type='text' label="City" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white',
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => {
              setCity(e.target.value)
              setError('')
              setSuccess('')
            }} value={city} />
            <TextField id="Pincode" type='number' label="Pincode" variant="standard" InputProps={{
              style: {
                color: 'white',
                borderBottom: '2px solid white',
              }
            }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' onChange={(e) => {
              setPincode(e.target.value)
              setError('')
              setSuccess('')
            }} value={pincode} />

          </div>
        </div>
        <p style={{width:'90%',textAlign:"end",marginTop:'10px'}}>Already have an account <Link to={'/login'}>Login</Link> here</p>

        {success.length > 0 && <strong className='text-success'>{success}<Link to={'/login'}>login</Link> to continue</strong>}
        {error.length > 0 && <strong className='text-danger'>{error}</strong>}
        <button type='submit' className='btn btn-light mt-3' style={{ backgroundColor: 'white' }}>{loading ? "loading..." : "Submit"}</button>
      </form>
    </div>
  )
}
