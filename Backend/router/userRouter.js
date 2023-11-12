const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userModelBuyer = require("../models/userModelBuyer")
const userModelSeller = require("../models/userModelSeller")

const userRouter=express.Router()



userRouter.post("/registerbuyer", async(req,res)=>{
    const {name,email,password}=req.body
    try {
        const userExist=await userModelBuyer.findOne({email})
        console.log(userExist)
        if(userExist) {
        res.status(400).send("user Already Exist")
        }
        else{
            const newPassword=await bcrypt.hash(password,10)
            console.log(newPassword)
            const user=await userModelBuyer.create({name,email,password:newPassword})
            user.save()
            res.status(200).send({msg:"The new User has been added"})
        }
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})

userRouter.post("/registerseller", async(req,res)=>{
    const {name,email,password,companyName}=req.body
    try {
        const userExist=await userModelSeller.findOne({email})
        console.log(userExist)
        if(userExist) {
        res.status(400).send("user Already Exist")
        }
        else{
            const newPassword=await bcrypt.hash(password,10)
            console.log(newPassword)
            const user=await userModelSeller.create({name,email,password:newPassword,companyName})
            user.save()
            res.status(200).send({msg:"Seller Register has been Successfully"})
        }
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})


userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModelBuyer.findOne({email})  || await userModelSeller.findOne({email})
        if(user){
           const verify= bcrypt.compare(password,user.password)
           if(!verify){
            res.status(400).send("Incorrect Password")
           }
           else{
            if(user.role==="Seller"){
                const token=jwt.sign({userID:user._id,role:user.role,companyName:user.companyName},"User",{expiresIn:"1d"})
            res.status(200).send({token})
               
            }
            else{
            const token=jwt.sign({userID:user._id,role:user.role},"User",{expiresIn:"1d"})
            res.status(200).send({token})

            }
           }
        }
        else{
            res.status(400).send({error:"User not found"})
        }
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})













module.exports=userRouter