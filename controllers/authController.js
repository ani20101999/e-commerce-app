const userModel = require("../models/userModel");
const {hashPassword,comparePassword} = require("../helpers/authHelper")
const jwt = require("jsonwebtoken");

const registerController = async(req,res)=>{
try{
 const {name,email,password,phone,address,answer} = req.body;
 if(!name){return res.send({error:"name is required"})}
 if(!email){return res.send({error:"email is required"})}
 if(!password){return res.send({error:"password is required"})}
 if(!phone){return res.send({error:"phone no. is required"})}
 if(!address){return res.send({error:"address is required"})}
 if(!answer){return res.send({error:"answer is required"})}

 //existing user
 const existingUser = await userModel.findOne({email});
 if(existingUser){
    res.send({
        success:false,
        message:"user already exist!! please login"
    })
 }
 //register
 const hashedPassword = await hashPassword(password)
 const userRegister = await userModel.create({name,email,password:hashedPassword,phone,address,answer});
 res.status(200).send({
    success:true,
    message:"user registered successfully",
    userRegister
 })
}
catch(err){
    console.log(err);
    res.status(500).send({
        success:false,
        message:"registration failed"
    })
}
}


//login
const loginController =async(req,res)=>{
try{
const {email,password} = req.body;
if(!email || !password){
   return res.status(404).send({
    success:false,
    message:"invalid email or password"
   })
}
const loginUser = await userModel.findOne({email});
if(!loginUser){
    return res.status(404).send({
        success:false,
        message:"email is not registered"
    })
}
const matchingPassword = await comparePassword(password,loginUser.password);
if(!matchingPassword){
    return res.status(404).send({
        success:false,
        message:"invalid password"
    })
}
//generating token for the user:
const token = await jwt.sign({_id:loginUser.id},process.env.JWT_TOKEN,{expiresIn:"10d"});
 res.status(200).send({
    success:true,
    message:"login successful",
    user:{
        name:loginUser.name,
        email:loginUser.email,
        phone:loginUser.phone,
        address:loginUser.address,
        role:loginUser.role
    },
    token
 })
}
catch(err){
console.log(err);
res.status(500).send({
    success:false,
    message:"invalid login"
})
}
}

//forgot password

 const forgotPasswordController = async(req,res)=>{
try{
 const {email,newPassword,answer} = req.body;

 if(!email){
    res.status(404).send("invalid email")
 }
 if(!answer){
    res.status(404).send("invalid answer")
 }
 if(!newPassword){
    res.status(404).send("invalid password")
 }

 //check
 const user = await userModel.findOne({email});
 if(!user){
    return res.status(404).send({
        success:false,
        message:"invalid user",
        user
    })
 }
const hashed = await hashPassword(newPassword);
const updatePassword = await userModel.findByIdAndUpdate(user._id,{password:hashed});
res.status(200).send({
    success:true,
    message:"password updated successfully",
    updatePassword
})
}
catch(err){
    console.log(err);
   return res.status(500).send({
        success:false,
        message:"invalid",
        err
    })
}
}

const testController =(req,res)=>{
    try{
     res.send("protected routes")
    }
    catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}


const updateController = async(req,res)=>{
try{
const {name,email,password,phone,address} = req.body;
const hashedPassword = password ? await hashPassword(password) : undefined
const user = await userModel.findByIdAndUpdate(req.user._id,{
    name:name,
    password:hashedPassword,
    phone:phone,
    address:address
},{new:true})
res.status(200).send({
    success:true,
    message:"updated successfully",
    user
})
}
catch(err){
    res.status(500).send({
        success:false,
        message:err
})
}
}
module.exports = {registerController,loginController,testController,forgotPasswordController,updateController}