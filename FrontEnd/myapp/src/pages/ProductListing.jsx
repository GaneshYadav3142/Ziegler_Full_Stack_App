import React, { useEffect, useState } from 'react'
import { Coursecard } from '../Component/Coursecard';
import { Button } from '@chakra-ui/react';
import { parseJwt } from '../ReusableFunction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../Styles/ProductListing.css"
import { format } from 'date-fns';

export const ProductListing = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [toggle, setToggle]=useState(false)
    const [seller,setSeller]=useState("")
    const [name,setName]=useState("")
    const [image,setImage]=useState("")
    const [quantity,setQuantity]=useState(0)
    const [price,setPrice]=useState(0)
    const [estidate,setDate]=useState(new Date())
    const token = parseJwt(localStorage.getItem("token"))
    console.log(token)
  
    const fetchProducts = async () => {
          const url=seller==="" ? `http://localhost:8080/products/` : `http://localhost:8080/products?seller=${seller}`
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

      const handleFormSubmit = (e) => {
        e.preventDefault();
        const product={image,name, quantity,price, shippingDate:estidate}
           let url = 'http://localhost:8080/products/add';
           let method="POST"
           fetch(url,{
                  method:method,
                  headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${localStorage.getItem('token')}`
                  },
                  body: JSON.stringify(product)
                }).then((res)=>res.json())
                .then((data)=>{
                    console.log(data)
                    alert( 'New Product added');
                    
                }).catch((error)=>{
                    console.log(error)
                })

                fetchProducts()
      };

    useEffect(() => {
     
      fetchProducts();
    }, [seller]);
  
   
  
    const handelDate=(date)=>{
        setDate(date)
    }
  
    return (
      <div className='product-listing'>
        <h1>Product Listing</h1>
     {token.role==="Seller" && <div><Button colorScheme="whatsapp" onClick={()=>setToggle(!toggle)}>{!toggle ? "Add Product" :"Cancel"}</Button> </div>}
     {toggle && (
        <div>
              <form onSubmit={handleFormSubmit}>
            <div>
             <label htmlFor="name">Product Name</label>
             <input type="text" value={name} id='name' onChange={(e)=>setName(e.target.value)} required/>
             </div>
             <div>
             <label htmlFor="image">Image Url</label>
             <input type="text" value={image} id='image' onChange={(e)=>setImage(e.target.value)} required/>
             </div>
             <div>
             <label htmlFor="quantity">Add Quantity</label>
             <input type="number" value={quantity} id='quantity' onChange={(e)=>setQuantity(e.target.value)} required/>
             </div>
             <div>
             <label htmlFor="price">Add Market price</label>
             <input type="number" value={price} id='price' onChange={(e)=>setPrice(e.target.value)} required/>
             </div>
             <div>
             <label htmlFor="date">Estimate Date</label>
             <DatePicker
            selected={estidate}
            onChange={handelDate}
            dateFormat="dd/MM/yyyy"
          />
             </div>
             <Button type='submit' >Submit</Button>
            </form>
        </div>
     )}
       <div className='searchbar'>
        <div>
            <label htmlFor="search">Search</label>
        <input
          type="text"
          id='search'
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
        {token.role==="Buyer" && (<div>
        <label htmlFor="filter-seller">Filter By Seller</label>
        <select id="filter-seller" onChange={(e)=>setSeller(e.target.value)} value={seller}>
          <option value="">All Seller</option>
          <option value="A1 Auto parts">A1 Auto parts</option>
          <option value="Seller2">Seller2</option>
          <option value="Seller3">Seller3</option>
        </select>
        </div>)}
      </div>
      <div className='container'>
          {data.map((el) => {
          return <Coursecard key={el._id} {...el}/>
          })}
     </div>
      </div>
    );
}
