const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:"Buyer",
    
})

const userModelBuyer=mongoose.model('User1',userSchema)


module.exports=userModelBuyer