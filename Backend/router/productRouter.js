const express=require('express')
const productModel = require('../models/productModel')

const productRouter=express.Router()

productRouter.post("/add", async(req, res)=>{
     
     const {image,name,quantity,price, seller,shippingDate}=req.body
     const sellerID=req.body.userID
     try {
         const product=await productModel.findOne({name})
         if(product){
            res.status(400).send("Product already Already Exist")
         }
         else{
            const productAdd=await productModel.create({image,name,quantity,price,seller,shippingDate,sellerID})
            productAdd.save()
            res.status(200).send("Product added Successfully")
         }
     } catch (error) {
        res.status(400).send({error:"error"})
     }
})


productRouter.get("/", async (req, res) => {
   
      const { role, userID, companyName } = req.body;
      const {seller}=req.query
      try {
      if (role === "Buyer") {
       if(seller){
        const queryProducts = await productModel.find({seller});
        if(queryProducts){
            res.status(200).send(queryProducts)
        }
        else{
            res.status(400).send({"msg":"No employee found of that deparment"})
        } 
    }
    else {
        const allProducts = await productModel.find({});
        res.status(200).send(allProducts)
    }
      } else if (role === "Seller") {
        // For sellers, fetch and display only their company's products
        const sellerProducts = await productModel.find({ sellerID: userID });
        return res.json(sellerProducts);
      } else {
        return res.status(400).json({ msg: "Invalid role" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  });


  productRouter.patch("/update/:id", async (req, res) => {
    try {
      const { role, userID, companyName } = req.body;
  
      if (role === "seller") {
        const productID = req.params.id;
  
       
        const updatedFields = {};
        for (const key in req.body) {
          if (key !== "role" && key !== "userID" && key !== "companyName") {
            updatedFields[key] = req.body[key];
          }
        }
  
        if (Object.keys(updatedFields).length === 0) {
          return res.status(400).json({ msg: "No valid fields provided for updating" });
        }
  
      
        const updatedProduct = await productModel.findByIdAndUpdate(
          productID,
          { $set: updatedFields },
          { new: true } 
        );
  
        if (updatedProduct) {
          return res.json(updatedProduct);
        } else {
          return res.status(404).json({ msg: "Product not found or you don't have permission to update" });
        }
      } else {
        return res.status(403).json({ msg: "Permission denied. Only sellers can update products." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  });
  
  productRouter.delete("/delete/:id", async (req, res) => {
    try {
      const { role, userID, companyName } = req.body;
  
      if (role === "seller") {
        const productID = req.params.id;
  
     
        if (!productID) {
          return res.status(400).json({ msg: "ProductID is required for deletion" });
        }
  
   
        const deletedProduct = await productModel.findByIdAndDelete({
          _id: productID,
          sellerID: userID,
        });
  
        if (deletedProduct) {
          return res.json({ msg: "Product deleted successfully" });
        } else {
          return res.status(404).json({ msg: "Product not found or you don't have permission to delete" });
        }
      } else {
        return res.status(403).json({ msg: "Permission denied. Only sellers can delete products." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  });



  module.exports=productRouter