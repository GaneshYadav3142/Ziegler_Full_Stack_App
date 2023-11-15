import React, { useEffect, useState } from 'react'
import { Cartcard } from '../Component/Cartcard'
import "../Styles/ProductListing.css"
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
export const Cartpage = () => {

   const [data,setData]=useState([])
    const navigate=useNavigate()

   let totalPrice = data.reduce((acc, el) => acc + el.quantity * el.productDetails.price, 0);
   const fetchCart=async()=>{
    const url="http://localhost:8080/carts/ordered-products"
    fetch(url,{
        method:"GET",
        headers: {
            'authorization':`Bearer ${localStorage.getItem("token")}`
        }
    })
    .then((res)=>{
        console.log(res)
        return res.json()
    })
    .then((res)=>{
        console.log(res.data)
        setData(res)
    }).catch((err)=>{
        console.log(err)
    })
   }


   const handelDelete=(id)=>{
    try {
     fetch(`http://localhost:8080/carts/delete/${id}`, {
         method: 'DELETE',
         headers: {
            'authorization': `Bearer ${localStorage.getItem("token")}`
         },
        
       })
       .then((res)=>res.json())
           .then((res)=>{
             console.log(res)
           })
           .catch((err)=>{
             console.log(err)
           })
    } catch (error) {
     console.log(error)
    }

    fetchCart()
}


   useEffect(()=>{
    fetchCart()
   },[totalPrice])

  return (
    <div className='container'>
        {
            data.map((el)=>{
                return (
                <div className='card-div'>
                <Cartcard key={el._id} {...el}/>
                <Button  colorScheme="green" onClick={()=>handelDelete(el._id)}>Remove</Button>
                </div>)
            })
        }
       <div className='totalprice-container'>
  <h2>Total Price:</h2>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsDAJdpHsJwWvbIv4N1MyYF5Q6IVfcMVzixA&usqp=CAU" alt="image"/>
  <span className='totalprice-value'>{totalPrice.toFixed(3)}</span>
  <Button onClick={()=>navigate("/checkout")}>Proceed to Checkout</Button>
</div>

    </div>
  )
}
