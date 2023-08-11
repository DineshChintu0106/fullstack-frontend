import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login'
import Register from '../components/Register/Register';
import Home from '../components/Home/Home';


export default function Routing() {
    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login name="dinesh" />} />
                <Route path='/register' element={<Register />} />
                <Route path='/home' element={<Home/>}/>
            </Routes>
        </div>
    )
}
