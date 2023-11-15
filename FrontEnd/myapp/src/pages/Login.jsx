import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../Styles/Login.css"
export const Login = () => {
        
         const [email,setEmail]=useState("")
         const [password,setPassword]=useState("")
         const navigate = useNavigate();

         const moveToRegister=()=>{
          navigate("/signupbuyer")
         }
         const handelSubmit=(e)=>{
            e.preventDefault()
            const data={
                email,
                password
            }
            fetch("http://localhost:8080/users/login",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify(data)
            }).then((res)=>res.json())
            .then((data)=>{
                console.log(data)
                if(data){
                localStorage.setItem("token",data.token)
                alert("Login Successfull")
                navigate("/productlisting")
                }
                else{
                  alert("invalid Credential")
                }
            }).catch((error)=>{
                console.log(error)
            })
         }

    

  return (
    <div className='login-container'>
      <h1>Authentication Protected Login/Register first</h1>
         <h1>Login page</h1>
         <form onSubmit={handelSubmit}>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" value={email} id="email" placeholder='Enter your Email' required onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" value={password} id="password" placeholder='Enter your Password' required onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button type='submit'>Submit</button>
        </form>
        <div>
      <h3>Not having a Account? </h3>
     <button onClick= {moveToRegister}>Register Here</button>
    </div>
    </div>
  )
}

