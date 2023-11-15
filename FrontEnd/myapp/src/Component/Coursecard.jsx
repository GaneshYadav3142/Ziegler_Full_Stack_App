import React from 'react'
import "../Styles/Coursecard.css"
import { parseJwt } from '../ReusableFunction'
import { Button } from '@chakra-ui/react'

export const Coursecard = ({_id,image,name,quantity,price,seller,shippingDate}) => {
    
    const token = parseJwt(localStorage.getItem("token"))

    const handelAddToCart=(id)=>{
      
        const url=`http://localhost:8080/carts/add-to-cart`
        fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({productID:id})
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            alert("product added to cart")
        }).catch((err)=>{
            console.log(err)
        })
    }
 
  return (
    <div className='card'>
     
        <div className='image'>
            <img src={image} alt="image" />
        </div>
        <div className='card-desc'>
            <h3>{name}</h3>
            <h4>Quantity :<strong>{quantity}</strong></h4>
            <p>Price : $<strong>{price}</strong></p>
            <p>Seller :{seller}</p>
            <p>Estimated delivery :{shippingDate }</p>
        </div>
       {token.role==="Buyer" ?(<div >
        <Button onClick={()=>handelAddToCart(_id)} colorScheme="green" >Add to Cart</Button>
        </div>) :
        (<div >
            <Button  colorScheme="green" >Delete</Button>
            </div>)
        }
    </div>
  )
}
