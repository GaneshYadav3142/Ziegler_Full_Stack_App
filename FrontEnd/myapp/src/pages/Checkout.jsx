import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
    cardDetails:""
  });

  const navigate=useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
   alert("Check out successsful")
   navigate("/logout")
  };

  return (
    <div className="checkout-container">
      <div className="shipping-details">
        <h2>Shipping Details</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={shippingDetails.name} onChange={handleInputChange} />

          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={shippingDetails.address} onChange={handleInputChange} />

          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={shippingDetails.city} onChange={handleInputChange} />

          <label htmlFor="zipCode">Zip Code:</label>
          <input type="text" id="zipCode" name="zipCode" value={shippingDetails.zipCode} onChange={handleInputChange} />
        
          <label htmlFor="carddetails">Card Details:</label>
          <input type="password" id="carddetails" name="carddetails" value={shippingDetails.cardDetails} onChange={handleInputChange} />
        
        </form>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        {/* Display your order items and total here */}
      </div>

      <button className="checkout-button" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};


