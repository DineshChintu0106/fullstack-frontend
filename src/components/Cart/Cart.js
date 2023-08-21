import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './Cart.css'
import { Link, useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import { v4 } from 'uuid'
import { Modal } from 'antd'

export default function Cart() {

  const [orders, setOrders] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [address, setAddress] = useState({})
  const [mobile, setMobile] = useState('')
  const [payment, setPayment] = useState('')

  const navigate = useNavigate()

  const gst = 2.5;
  const deliveryCharges = 50


  const fetchCart = async () => {
    const user = await Cookies.get("activeUser")
    console.log(user)
    axios.get(`https://restbook.onrender.com/getCart/${user}`).then((res) => {
      setOrders(res.data.cart)
      setMobile(res.data.mobile)
      setAddress(res.data.address)
      let sum = 0
      res.data.cart.map((each) => {
        return sum = sum + each.cost * each.quantity
      })
      sum = sum + deliveryCharges + (sum * gst / 100)
      setTotalCost(sum)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleDelete = (id) => {
    const user = Cookies.get("activeUser")
    const data = {
      id: user,
      cartId: id
    }
    axios.post('https://restbook.onrender.com/deleteitem', data).then((res) => {
      console.log(res)
      fetchCart()
    })
  }

  const handlePlaceOrder = () => {
    const user = Cookies.get("activeUser")
    const data = {
      id: user,
      orderId: v4(),
      orders: {
        items: orders,
      },
      isDelivered: false,
      orderStatus: true,
      totalCost: Math.round(totalCost),
      payment: payment,
      orderedOn: new Date(),
      address: address,
      mobile: mobile
    }
    axios.post("https://restbook.onrender.com/placeorder", data).then((res) => {
      console.log(res)
      if (res.status === 200) {
        Modal.success({
          content: 'Placed Order successfully...',
          centered: true,
          okText: "Go to MyOrders",
          okType: 'danger',
          maskClosable: true,
          onOk: () => {
            navigate('/myorders')
          }
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <div>
      <div style={{ height: "85vh", overflow: "scroll", overflowX: "hidden" }} className='pb-3'>
        <div className='d-flex justify-content-around p-5'>
          <Link to={'/home'}><Icon.ArrowLeftCircle color='red' height={30} width={50} /></Link>
          <h1>Cart</h1>
          <div></div>
        </div>

        {orders.length > 0 ? <div>
          <div className='d-flex flex-wrap justify-content-center align-items-center gap-4'>

            {orders.map((each) => {
              return (
                <div key={each.cartId} className='restaurant-box'>
                  <img style={{ borderRadius: "50%" }} src='https://th.bing.com/th?q=Boneless+Chicken+Biryani&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247' alt='biryani' width={150} height={150} />
                  <div className='right-card'>
                    <div>
                      <div>
                        <h4>{each.item}</h4>
                        <p>{each.cost} Rs</p>
                      </div>
                      <div className='d-flex align-items-center gap-2'>
                        <div><b>Qunatity: </b>{each.quantity}</div>
                      </div>
                    </div>
                    <Icon.Trash3Fill height={30} width={30} onClick={() => { handleDelete(each.cartId) }} />


                  </div>
                </div>
              )

            })}
          </div>
          <div className='bill-section'>
            <table>
              <thead>
                <tr style={{ borderBottom: "1px solid black" }}>
                  <th>Items</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((each) => {
                  return <tr key={each.cartId} style={{ borderBottom: "1px solid black" }}>
                    <td>{each.item} x{each.quantity}</td>
                    <td>{each.cost * each.quantity}</td>
                  </tr>
                })}
                <tr style={{ borderBottom: "1px solid black" }}>
                  <td>Delivery charges</td>
                  <td>{deliveryCharges}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid black" }}>
                  <td>GST</td>
                  <td>{gst}%</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td>{totalCost}</td>
                </tr>

              </tbody>
            </table>
          </div>
          <div>
            <h1>Payment</h1>
            <div className='d-flex align-items-center justify-content-center gap-2'>
              <input type='radio' name='payment' id='cod' value={"Cash on delivery"} onClick={(e) => { setPayment(e.target.value) }} />
              <label className='d-flex align-items-center gap-2' htmlFor='cod'><Icon.Cash /><span>Cash on delivery</span></label>
            </div>
            <div className='d-flex align-items-center justify-content-center gap-2'>
              <input type='radio' name='payment' id='phonepe' value={"Phonepe"} onClick={(e) => { setPayment(e.target.value) }} />
              <label className='d-flex align-items-center gap-2' htmlFor='phonepe'><Icon.Phone /><span>PhonePe</span></label>
            </div>
          </div>
          <div className='footer-button'>
            <div className='d-flex justify-content-around' style={{ borderBottom: "1px solid lightGrey" }}>
              <p>Address: {address.doorNo},{address.street},{address.mandal},{address.city}-{address.pincode}</p>
              <p className='text-danger'>Change</p>
            </div>
            <div className='d-flex justify-content-around p-2'>
              <p>Total: <strong>{Math.round(totalCost)} Rs</strong></p>
              <button className='btn btn-danger col-6 col-lg-2' onClick={handlePlaceOrder}>Place Order</button>
            </div>
          </div>
        </div> : <h1>no items in the cart</h1>}


      </div>


    </div>
  )
}
