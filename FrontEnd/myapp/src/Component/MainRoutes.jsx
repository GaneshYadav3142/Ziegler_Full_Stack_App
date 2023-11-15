import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import { Homepage } from '../pages/Homepage'
import { SignupSeller } from '../pages/SignupSeller'
import { SignupBuyer } from '../pages/SignupBuyer'
import { Login } from '../pages/Login'
import { ProductListing } from '../pages/ProductListing'
import { Privateroute } from './Privateroute'
import { Logout } from '../pages/Logout'
import { Cartpage } from '../pages/Cartpage'
import {Checkout} from '../pages/Checkout'


export const MainRoutes = () => {
  return (
    <div  style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <Routes>
        <Route path="/"  element={<Homepage/>}/>
        <Route path="/signupbuyer"  element={<SignupBuyer/>}/>
        <Route path="/signupseller"  element={<SignupSeller/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/productlisting"  element={<Privateroute><ProductListing/></Privateroute>}/>
        <Route path="/cartpage"  element={<Privateroute><Cartpage/></Privateroute>}/>
        <Route path="/checkout"  element={<Privateroute><Checkout/></Privateroute>}/>

        <Route path="/logout" element={<Privateroute><Logout/></Privateroute>}/>
    </Routes>
</div>
  )
}
