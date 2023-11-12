const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    companyName:String,
    role:"Seller",
    
})

const userModelSeller=mongoose.model('User2',userSchema)


module.exports=userModelSeller