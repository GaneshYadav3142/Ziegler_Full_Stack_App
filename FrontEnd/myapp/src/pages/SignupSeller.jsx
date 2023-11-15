import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import "../Styles/Signup.css"
export const SignupSeller = () => {
         const [name,setName]=useState("")
         const [email,setEmail]=useState("")
         const [password,setPassword]=useState("")
         const [confirm,setConfirm]=useState("")
         const [companyName,setCompanyName]=useState("")

         const navigate=useNavigate()

         const moveToLogin=()=>{
          navigate("/login")
         }
         const handelSubmit=(e)=>{
                e.preventDefault()

                if(password!==confirm){
                    alert("Enter Confirm password correctly")
                }
                else{
                const data={
                    name,
                    email,
                    password,
                    companyName
                }
                fetch("http://localhost:8080/users/registerseller",{
                  method:"POST",
                  headers:{
                    "Content-Type":"application/json"
                  },
                  body: JSON.stringify(data)
                }).then((res)=>res.json())
                .then((data)=>{
                    console.log(data)
                   
                    alert("user added Successfully")
                    navigate("/login")
                }).catch((error)=>{
                    console.log(error)
                })
            }
         }


  return (
    <div className='signup-container'>
         <h1>SignUp page</h1>
         <form onSubmit={handelSubmit}>
         <div>
            <label htmlFor="name">Name</label>
            <input type="text" value={name} id="name" placeholder='Enter your Name' required onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="companyname">Company Name</label>
            <input type="text" value={companyName} id="companyname" placeholder='Enter your Company Name' required onChange={(e)=>setCompanyName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" value={email} id="email" placeholder='Enter your Email' required onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" value={password} id="password" placeholder='Enter your Password' required onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="confirm">Confirm Password</label>
            <input type="password" value={confirm} id="confirm" placeholder='Enter your Password Again' required onChange={(e)=>setConfirm(e.target.value)}/>
        </div>
        <button type='submit'>Submit</button>
        </form>
        <div>
      <h3>Already a Seller ? </h3>
     <button onClick= {moveToLogin}>Login</button>
    </div>
    </div>
  )
}
