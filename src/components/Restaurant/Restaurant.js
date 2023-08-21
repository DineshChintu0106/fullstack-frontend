import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './Restaurant.css'
import { v4 } from 'uuid'
import { Modal, Spin } from 'antd';
import * as Icon from 'react-bootstrap-icons'
import Cookies from 'js-cookie'
import { LoadingOutlined } from '@ant-design/icons';


export default function Restaurant() {

    const [data, setData] = useState({})
    const [food, setFood] = useState([])
    const [loading, setLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()


    const fetchdata = () => {
        axios.get(`https://restbook.onrender.com/fetchDetails/${params.id}`).then((res) => {
            setData(res.data[0])
            setFood(res.data[0]["Food items"].map((each) => {
                return { ...each, quantity: 0 }
            }))
            setLoading(false)
        })
    }
    const handleQuantity = (name) => {
        setFood(food.map((each) => {
            if (name === each.item) {
                return { ...each, quantity: 1 }
            } else {
                return each
            }
        }))
    }

    const decrement = (name) => {
        setFood(food.map((each) => {
            if (name === each.item) {
                return { ...each, quantity: each.quantity - 1 }
            } else {
                return each
            }
        }))
    }

    const increment = (name) => {
        setFood(food.map((each) => {
            if (name === each.item) {
                return { ...each, quantity: each.quantity + 1 }
            } else {
                return each
            }
        }))
    }

    const Success = () => {
        setLoading(true)
        const cart = food.filter((each) => each.quantity > 0)
        const orderCart = cart.map((each) => {
            return { ...each, cartId: v4(), activeOrder: false }
        })
        const activeUser = Cookies.get("activeUser")
        const data = {
            id: activeUser,
            orders: orderCart
        }
        axios.put('https://restbook.onrender.com/addToCart', data).then((res) => {
            if (res.data === "success") {
                setLoading(false)
                Modal.success({
                    content: 'Added to cart successfully...',
                    centered: true,
                    okText: "Go to Cart",
                    okType: 'danger',
                    maskClosable: true,
                    onOk: () => {
                        navigate('/cart')
                    }
                });
            }
        }).catch((err) => {
            console.log(err)
        })

    };

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 40,
            }}
            spin
        />
    );


    useEffect(() => {
        fetchdata()
    }, [])


    return (
        <div className='d-flex flex-column justify-content-between p-5' style={{ height: "100vh" }}>
            <div>
                <div className='d-flex justify-content-around mb-4'>
                    <Link to={'/home'}><Icon.ArrowLeftCircle color='red' height={30} width={50} /></Link>
                    <h1>{data.Name}</h1>
                    <div></div>
                </div>

                {loading ? <div className='d-flex align-items-center justify-content-center' style={{ height: "80vh" }}> <Spin indicator={antIcon} /></div> : <div className='d-flex flex-wrap justify-content-center align-items-center gap-4'>
                    {food.map((each) => {
                        return <div key={each.item} className='restaurant-box'>
                            <img style={{ borderRadius: "50%" }} src='https://th.bing.com/th?q=Boneless+Chicken+Biryani&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247' alt='biryani' width={150} height={150} />
                            <div className='right-card'>
                                <div>
                                    <h4>{each.item}</h4>
                                    <p>{each.cost} Rs</p>
                                </div>
                                {each.quantity === 0 ? <button className='btn btn-danger' onClick={() => handleQuantity(each.item)}>Add</button> : <div className='d-flex align-items-center gap-2'>
                                    <button className='btn btn-danger button-d' onClick={() => { decrement(each.item) }}>-</button>
                                    <div>{each.quantity}</div>
                                    <button className='btn btn-danger button-i' onClick={() => { increment(each.item) }}>+</button>
                                </div>}
                            </div>
                        </div>
                    })}</div>}


            </div>
            <div>{food.filter((each) => each.quantity > 0).length > 0 && <button className='btn btn-danger col-4' onClick={Success}>Add to Cart</button>}</div>

        </div>
    )
}
