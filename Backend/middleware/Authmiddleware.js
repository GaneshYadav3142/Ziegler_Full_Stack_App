const jwt=require("jsonwebtoken")

const authMiddleware=async (req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1]

if(token){
    try {
        const decode=jwt.verify(token,"User");
        if(decode){
            req.body.userID=decode.userID;
            req.body.role=decode.role;
            if(decode.companyName){
                req.body.companyName=decode.companyName
            }
            next()
        }
        else{
            res.json("Not Authorized")
        }
    } catch (error) {
        res.json({err:"error"})
    }
}
else{
    res.json({msg:"Please Login"})
}
}

module.exports=authMiddleware