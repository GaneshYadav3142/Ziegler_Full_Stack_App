const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const userRouter = require("./router/userRouter")
const authMiddleware = require("./middleware/Authmiddleware")

const app=express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use(authMiddleware)










app.listen(8080,async()=>{
    try {
        mongoose.connect("mongodb+srv://Ganesh:Yadav@cluster0.z7f4ecg.mongodb.net/TradingApp?retryWrites=true&w=majority")
        console.log("Server is listening at port 8080")
    } catch (error) {
        console.log("server error")
    }
})

