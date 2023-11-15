
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate=useNavigate()
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    
    if (countdown === 0) {
      clearInterval(timer);
      localStorage.clear();
     navigate("/");
    }

   
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="logout-message" style={{textAlign:'center'}}>
      <h2 >Logout successful. Redirecting to Homepage in {countdown} seconds...</h2>
    </div>
  );
};
