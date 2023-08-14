import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login'
import Register from '../components/Register/Register';
import Home from '../components/Home/Home';
import Profile from '../components/Profile/Profile';
import Restaurant from '../components/Restaurant/Restaurant';
import Cart from '../components/Cart/Cart';

export default function Routing() {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<Login/>}/>
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/home' element={<Home/>}/>
                <Route exact path='/profile' element={<Profile/>}/>
                <Route exact path='/restaurant/:id' element={<Restaurant/>}/>
                <Route exact path='/cart' element={<Cart/>}/>
            </Routes>
        </div>
    )
}
