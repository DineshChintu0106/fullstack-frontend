import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Restaurant() {

    const [data, setData] = useState({})
    const [food,setFood] = useState([])

    const params = useParams()

    const fetchdata = () => {
        axios.get(`http://localhost:4000/fetchDetails/${params.id}`).then((res) => {
            setData(res.data[0])
            setFood(res.data[0]["Food items"])
        })
    }

    useEffect(() => {
        fetchdata()
    }, [])


    return (
        <div>
            <h1>{data.Name}</h1>
            <ul>{food.map((each,arr) => {
                return <li key={each.item}>{each.item}</li>
            })}</ul>
        </div>
    )
}
