import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HamburgerIcon} from '@chakra-ui/icons'
import "../Styles/Navbar.css"
import { parseJwt } from '../ReusableFunction'
export const Navbar = () => {
    const [isResponsive, setResponsive] = useState(false);
   const token=parseJwt(localStorage.getItem("token"))
    const toggleResponsive = () => {
      setResponsive(!isResponsive);
    };

  return (
   <div className={`topnav ${isResponsive ? 'responsive' : ''}`} id="myTopnav">
    <Link to="/" className="active"> Home</Link>
    <Link to="/signupbuyer" >SignUp</Link>
    <Link to="/productlisting" >Products</Link>
    <Link to="/cartpage" >{ "Cart" || token.role==="Buyer" ? "Cart" : "Orderpage"}</Link>
    <Link to="/logout" >Logout</Link>
    <a  className="icon"  onClick={toggleResponsive}>
    <HamburgerIcon/>
      </a>
   </div>
  )
}
