import React, { useState } from 'react'
import './Register.css'
import { Input } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      username,
      email,
      password,
      address
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
    }).catch(err => console.log(err))
  }
  return (
    <div className='register-container'>
      <form className='form-register col-lg-4 col-md-8 col-sm-10 col-xs-10' onSubmit={handleClick}>
        <h1>Sign UP</h1>
        <Input type='text' placeholder="Username" className='input-field' onChange={(e) => { setUsername(e.target.value) }} value={username} />
        <Input type='email' placeholder="Email" className='input-field' onChange={(e) => { setEmail(e.target.value) }} value={email} />
        <Input type='password' placeholder="Password" className='input-field' onChange={(e) => { setPassword(e.target.value) }} value={password} />
        <Input type='text' placeholder="Adderss" className='input-field' onChange={(e) => { setAddress(e.target.value) }} value={address} />
        {success.length > 0 && <strong className='text-success'>{success}<Link to={'/login'}>login</Link> to continre</strong>}
        <button type='submit' className='btn btn-light' style={{ backgroundColor: 'white' }}>{loading ? "loading..." : "Submit"}</button>
      </form>
    </div>
  )
}
