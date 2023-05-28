const express = require("express");
const route = express.Router()
const {registerController,loginController,testController,forgotPasswordController,updateController} = require("../controllers/authController")
const {requireSignin,isAdmin} = require("../middlewares/authMiddleware")
//registration
route.post("/register",registerController)

//login
route.post("/login",loginController)

//test
route.get("/test",requireSignin,isAdmin,testController)

//forgot password
route.post("/forgot-password",forgotPasswordController)

//protected user auth route
route.get("/user-route",requireSignin,(req,res)=>{
    res.status(200).send({ok:true});
})

//protected admin auth route
route.get("/admin-route",requireSignin,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

//update 
route.put("/update",requireSignin,updateController)
module.exports = route;