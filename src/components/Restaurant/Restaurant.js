import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './Restaurant.css'
import { v4 } from 'uuid'
import { Button, Modal } from 'antd';

export default function Restaurant() {

    const [data, setData] = useState({})
    const [food, setFood] = useState([])

    const params = useParams()

    const fetchdata = () => {
        axios.get(`http://localhost:4000/fetchDetails/${params.id}`).then((res) => {
            setData(res.data[0])
            setFood(res.data[0]["Food items"].map((each) => {
                return { ...each, quantity: 0 }
            }))
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
        console.log(food)
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
        const cart = food.filter((each) =>  each.quantity > 0)
        const oredrCart = cart.map((each) => {
            return {...each,orderId:v4()}
        })
        console.log(oredrCart)
        Modal.success({
          content: 'some messages...some messages...',
          centered:true,
          okText:"Go to Cart",
          okType:'danger',
          maskClosable:true, 
        });
      };


    useEffect(() => {
        fetchdata()
    }, [])


    return (
        <div className='d-flex flex-column justify-content-between pb-5' style={{ height: "100vh" }}>
            <div>
                <h1>{data.Name}</h1>
                <div className='d-flex flex-wrap justify-content-center align-items-center gap-4'>{food.map((each) => {
                    return <div key={each.item} className='restaurant-box'>
                        <img style={{ borderRadius: "50%" }} src='https://th.bing.com/th?q=Boneless+Chicken+Biryani&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247' alt='biryani' width={150} height={150} />
                        <div className='right-card'>
                            <div>
                                <h4>{each.item}</h4>
                                <p>{each.Cost} Rs</p>
                            </div>
                            {each.quantity === 0 ? <button className='btn btn-danger' onClick={() => handleQuantity(each.item)}>Add</button> : <div className='d-flex align-items-center gap-2'>
                                <button className='btn btn-danger' onClick={() => { decrement(each.item) }}>-</button>
                                <div>{each.quantity}</div
                                ><button className='btn btn-danger' onClick={() => { increment(each.item) }}>+</button>
                            </div>}
                        </div>
                    </div>
                })}</div>
            </div>
            <div>{food.filter((each) => each.quantity > 0).length > 0 && <Button onClick={Success}>Add to Cart</Button>}</div>

        </div>
    )
}
