const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")

const cors=require("cors")
const userRouter = require("./router/userRouter")
const authMiddleware = require("./middleware/Authmiddleware")
dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use(authMiddleware)










app.listen(8080,async()=>{
    try {
        mongoose.connect(process.env.URL)
        console.log("Server is listening at port 8080")
    } catch (error) {
        console.log("server error")
    }
})

