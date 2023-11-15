const express=require('express');
const productModel = require('../models/productModel');
const cartModel = require('../models/cartModel');


const cartRouter=express.Router()



cartRouter.post("/add-to-cart", async (req, res) => {
  const { productID, quantity } = req.body;
  const userID=req.body.userID
  try {
  

    if (!userID || !productID) {
       res.status(400).send({ msg: "userID and productID are required for adding to cart" });
    }

    const product = await productModel.findById(productID);
    if (!product) {
       res.status(404).send({ msg: "Product not found" });
    }
    const existingCartItem = await cartModel.findOne({ userID, productID });

    if (existingCartItem) {
     
      existingCartItem.quantity += quantity || 1; 
      await existingCartItem.save();
       res.status(200).send(existingCartItem);
    } else {
     
      const cartItem = new cartModel({
        userID,
        productID,
        quantity: quantity || 1,
      });

    
      const savedCartItem = await cartItem.save();
       res.status(200).send(savedCartItem);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

cartRouter.get("/ordered-products", async (req, res) => {
  const { role, userID } = req.body;

  try {
    if (!userID) {
      return res.status(400).json({ msg: "userID is required to fetch ordered products" });
    }

    let orderedProducts;

    if (role === "Buyer") {
      orderedProducts = await cartModel.find({ userID });
    } else if (role === "Seller") {
      const sellerOrderedProducts = await cartModel
        .find({ userID })
        .populate({
          path: "productID",
          match: { sellerID: userID },
        })
        .exec();

      orderedProducts = sellerOrderedProducts.filter((order) => order.productID);
    } else {
      return res.status(403).json({ msg: "Invalid role" });
    }

    // Extracting product IDs from orderedProducts array
    const productIds = orderedProducts.map((order) => order.productID);

    // Fetching product details for all product IDs
    const productsDetails = await productModel.find({ _id: { $in: productIds } });

    // Combining product details with orderedProducts array
    const orderedProductsDetails = orderedProducts.map((order) => {
      const productDetail = productsDetails.find((product) => product._id.equals(order.productID));
      return {
        _id: order._id,
        userID: order.userID,
        productDetails: productDetail,
        quantity: order.quantity,
        __v: order.__v,
      };
    });

    return res.status(200).json( orderedProductsDetails );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});


// Import necessary modules and models

cartRouter.patch("/update-quantity/:cartItemId", async (req, res) => {
  const { quantity } = req.body;
  const { cartItemId } = req.params;

  try {
    if (!quantity) {
       res.status(400).send({ msg: "Quantity is required for updating cart item" });
    }

    const cartItem = await cartModel.findById(cartItemId);

    if (!cartItem) {
       res.status(404).send({ msg: "Cart item not found" });
    }

    cartItem.quantity = quantity;

    const updatedCartItem = await cartItem.save();

     res.status(200).send(updatedCartItem);
  } catch (error) {
    console.error(error);
     res.status(500).send({ msg: "Internal Server Error" });
  }
});


cartRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the cart item exists
    const cartItem = await cartModel.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).json({ msg: 'Cart item not found' });
    }

    // Remove the cart item
  

    return res.status(200).json({ msg: 'Cart item deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});
module.exports=cartRouter