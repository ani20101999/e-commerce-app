const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireSignin=async(req,res,next)=>{
 try{
  const decode = jwt.verify(req.headers.authorization,process.env.JWT_TOKEN);
  req.user = decode
  next()
 }
 catch(err){
    console.log(err)
    res.status(500).send(err)
 }
}

const isAdmin = async(req,res,next)=>{
  try{
   const user = await userModel.findById(req.user._id);
   if(!user.role){
    return res.status(401).send("unauthorized access")
   }
   else{
    next()
   }
  }
  catch(err){
    console.log(err)
    res.status(500).send(err)
 }
}

module.exports = {requireSignin,isAdmin}