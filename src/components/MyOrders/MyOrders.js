import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import * as Icon from 'react-bootstrap-icons'
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = () => {
    const user = Cookies.get("activeUser")
    axios.get(`https://restbook.onrender.com/getplaceorder/${user}`).then((res) => {
      setData(res.data)
      setLoading(false)
    })
  }

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 40,
      }}
      spin
    />
  );

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <>
      <div className='d-flex justify-content-around p-5'>
        <Link to={'/home'}><Icon.ArrowLeftCircle color='red' height={30} width={50} /></Link>
        <h1>My Orders</h1>
        <div></div>
      </div>

      {loading ? <div className='d-flex align-items-center justify-content-center' style={{ height: "80vh" }}> <Spin indicator={antIcon} /></div> :
        <div className='d-flex justify-content-center flex-wrap gap-3 mb-5'>
          {data.map((each) => {
            return <div key={each.orderId} className='orders-card p-3'>
              <div className='d-flex justify-content-end gap-2'>Order status : {each.orderStatus ? <span className='text-light bg-success' style={{ borderRadius: "5px", paddingLeft: "5px", paddingRight: "5px" }}>Active</span> : "Delivered"}</div>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th scope="row">#Order Id</th>
                    <td>{each.orderId}</td>
                  </tr>
                  <tr>
                    <th scope="row">Items</th>
                    <td>{each.orders.items.map((item) => {
                      return <span key={item.cartId}><b className='font-bold'>x{item.quantity}</b> {item.item}</span>
                    })}</td>
                  </tr>
                  <tr>
                    <th scope="row">Cost</th>
                    <td>{each.totalCost}/-</td>
                  </tr>
                  <tr>
                    <th scope="row">Mobile</th>
                    <td>{each.mobile}</td>
                  </tr>
                  <tr>
                    <th scope="row">Payment</th>
                    <td>{each.payment}</td>
                  </tr>
                  <tr>
                    <th scope="row">Address</th>
                    <td style={{ textOverflow: "ellipsis" }}>{each.address.doorNo},{each.address.street},{each.address.mandal},{each.address.city},{each.address.pincode}</td>
                  </tr>
                  <tr>
                    <th scope="row">Status</th>
                    <td><span className='text-light bg-success' style={{ borderRadius: "5px", paddingLeft: "5px", paddingRight: "5px" }}>Food is being prepared</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          })}
        </div>}

    </>
  )
}
