const express=require('express');
const productModel = require('../models/productModel');
const cartModel = require('../models/cartModel');

const cartRouter=express.Router()



cartRouter.post("/add-to-cart/:productId", async (req, res) => {
    try {
      const { userID } = req.body;
      const productID = req.params.productId;
  
    
      if (!userID || !productID) {
        return res.status(400).json({ msg: "userID and productID are required for adding to cart" });
      }
  
      
      const product = await productModel.findById(productID);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
  
    
      const cartItem = new cartModel({
        userID,
        productID,
       
      });
  
      
      const savedCartItem = await cartItem.save();
  
      
  
      return res.json(savedCartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  });