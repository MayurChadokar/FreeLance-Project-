const User=require('../models/User');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const auth = async(req,res,next)=>{
    try{
        const token = req.body.token || req.query.token || req.header("Authorization")?.split('')[1];  
        if(!token){
            return res.status(401).json({
                success:false,
                message:"you can't access it"
            })
            
        }
        // console.log(token);QQ    
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        // console.log(decoded);
        const user=await User.findOne({grNumber:decoded.grNumber});
        // console.log(user);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        req.user=user;

        next();

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
};

module.exports=auth;