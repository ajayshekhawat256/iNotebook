var jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagoodbdollar";
const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).json({error:"Please authenticate using a valid one"});
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
        
    } catch (error) {
        console.error(error.message);
        res.status(401).json("Please authenticate yourself");
    }
}
module.exports=fetchuser;