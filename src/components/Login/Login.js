import React from 'react'
import './Login.css'
import { TextField } from '@mui/material'

export default function Login() {
  return (
    <div className='home-container'>
      <form>
        <TextField id="username" type='text' label="Username" variant="standard" InputProps={{
          style: {
            color: 'white',
            borderBottom: '2px solid white'
          }
        }} InputLabelProps={{ style: { color: 'white' } }} className='input-field' />
      </form>
    </div>
  )
}
