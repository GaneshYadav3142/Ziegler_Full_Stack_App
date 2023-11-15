import React, { useEffect, useState } from 'react'
import { parseJwt } from '../ReusableFunction'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

export const Cartcard = ({productDetails,quantity,_id}) => {

      const token=parseJwt(localStorage.getItem("token"))
      const [quant,setQuant]=useState(quantity)
    
      const handelIncrement= async (id)=>{
           setQuant((prev)=>prev+1)
            
        try {
            setTimeout(()=>{
           fetch(`http://localhost:8080/carts/update-quantity/${id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                   'authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({quantity:quant}),
              })
              .then((res)=>res.json())
              .then((res)=>{
                console.log(res)
              })
              .catch((err)=>{
                console.log(err)
              })},1000)
        } catch (error) {
            console.log(error)
        }
      }

      const handelDecrement= async (id)=>{
      setQuant((prev)=>prev-1)
      
    try {
    setTimeout(()=>{
       fetch(`http://localhost:8080/carts/update-quantity/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
               'authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({quantity:quant}),
          })
          .then((res)=>res.json())
              .then((res)=>{
                console.log(res)
              })
              .catch((err)=>{
                console.log(err)
              })},1000)
         
    } catch (error) {
        console.log(error)
    }
  }

  
  useEffect(()=>{

  },[quant])
  return (
  <div className='card'>
     
        <div className='image'>
            <img src={productDetails.image} alt="image" />
        </div>
        <div className='card-desc'>
            <h3>{productDetails.name}</h3>
            <p>Price : $<strong>{productDetails.price}</strong></p>
            <p>Seller :{productDetails.seller}</p>
            <p>Estimated delivery :{productDetails.shippingDate }</p>
        </div>
       {token.role==="Buyer" && (<div >
        <Button onClick={()=>handelIncrement(_id)} colorScheme="green" ><AddIcon/></Button>
        <Button isDisabled  colorScheme="green" >{quant}</Button>
        <Button isDisabled={quant===1} onClick={()=>handelDecrement(_id)} colorScheme="green" ><MinusIcon/></Button>
        {/* <Button  colorScheme="green" onClick={()=>handelDelete(_id)}>Remove</Button> */}
        </div>) 
}
    </div>
  )
}
