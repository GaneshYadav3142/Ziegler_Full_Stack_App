
const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    image:String,
    name:String,
    quantity:Number,
    price:Number,
    seller:String,
    shippingDate:Date,
    sellerID:String
})

const productModel=mongoose.model('Product',productSchema)


module.exports=productModel

