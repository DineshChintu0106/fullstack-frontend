import Cookies from 'js-cookie'
import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function MyOrders() {

  const fetchOrders = () => {
    const user = Cookies.get("activeUser")
    axios.get(`https://restbook.onrender.com/getplaceorder/${user}`).then((res) => {
      console.log(res)
    })
  }

  useEffect(() => {
    fetchOrders()
  },[])

  return (
    <div>MyOrders</div>
  )
}
