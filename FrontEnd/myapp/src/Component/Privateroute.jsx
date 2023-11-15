import React from 'react'

import {Navigate, useLocation} from 'react-router-dom'

export const Privateroute = ({children}) => {
    const token=localStorage.getItem("token") || false
    const location=useLocation()
    return token?children: <Navigate state={location.pathname} replace={true} to="/login"/>
} 