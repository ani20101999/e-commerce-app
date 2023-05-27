const productModel = require("../models/productModel");
const slugify = require("slugify");
const fs = require("fs");
const { findByIdAndUpdate } = require("../models/userModel");

const createProductController = async(req,res)=>{
try{
 const {name,slug,description,price,category,quantity,shipping} = req.fields;
 const {photo} = req.files;

 if(!name){res.status(500).send({error:"name is required"})};
 if(!description){res.status(500).send({error:"description is required"})};
 if(!price){res.status(500).send({error:"price is required"})};
 if(!category){res.status(500).send({error:"category is required"})};
 if(!quantity){res.status(500).send({error:"quantity is required"})};
 if(photo && photo.size>100000){res.status(500).send({error:"photo is required and size less than 1 mb"})};


 const product = new productModel({...req.fields,slug:slugify(name)})
 if(photo){
    product.photo.data = fs.readFileSync(photo.path);
    product.photo.contentType = photo.type;
 }
 await product.save();
 res.status(201).send({
    success:true,
    message:"product created successfully",
    product
 })
}
catch(err){
    console.log(err);
    res.status(500).send({
        success:false,
        message:"invalid request"   
      })
}
}

const getProductController=async(req,res)=>{
 const products = await productModel.find({}).limit(12).sort({createdAt:-1});
 res.status(201).send({
    success:true,
    message:"products",
    count:products.length,
    products
 })
}

const getSingleProductController = async(req,res)=>{
try{
 const {slug} = req.params;
 const singleProduct = await productModel.findOne({slug});

 res.status(201).send({
    success:true,
    message:"products",
    singleProduct
 })
}
catch(err){
    console.log(err);
    res.status(500).send({
        success:false,
        message:"invalid"
    })
}
}

const getPhotoController=async(req,res)=>{
 const {pid} = req.params;
 const product = await productModel.findById(pid).select("photo");
 if( product.photo.data){
    res.set("content-type",product.photo.contentType);
    return res.status(201).send(
        product.photo.data
    )
 }
}

const deleteProductController =async(req,res)=>{
const {slug} = req.params;
const deleteProduct = await productModel.deleteOne({slug});
res.status(201).send({
    success:true,
    message:"deleted successfully",
    deleteProduct
})
}

const updateProductController = async(req,res)=>{
    try{
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        const {pid} = req.params
       
        if(!name){res.status(500).send({error:"name is required"})};
        if(!description){res.status(500).send({error:"description is required"})};
        if(!price){res.status(500).send({error:"price is required"})};
        if(!category){res.status(500).send({error:"category is required"})};
        if(!quantity){res.status(500).send({error:"quantity is required"})};
        if(photo && photo.size>100000){res.status(500).send({error:"photo is required and size less than 1 mb"})};
       
       
        const product = await productModel.findByIdAndUpdate(pid,{...req.fields,slug:slugify(name)},{new:true})
        if(photo){
           product.photo.data = fs.readFileSync(photo.path,"utf-8");
           product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(201).send({
           success:true,
           message:"product created successfully",
           product
        })
       }
       catch(err){
           console.log(err);
           res.status(500).send({
               success:false,
               message:"invalid request"   
             })
       }
}

//get product filter controller

const productFilterController = async(req,res)=>{
 try{
 const {checked,radio} = req.body;
 let args={}
 if(checked.length>0)args.category=checked
 if(radio.length>0)args.price={$gte:radio[0],$lte:radio[1]}

 const products = await productModel.find(args);
 res.status(200).send({
   success:true,
   message:"filtered successfully",
   products
 })
 }
 catch(err){
    console.log(err);
    res.status(500).send(err);
 }
}


//search product controller

const searchProductController = async(req,res)=>{
try{
 const {keywords} = req.params;
 const searchResult = await productModel.find({name:{$regex:keywords,$options:"i"}}).select("-photo");
 res.json(searchResult)
}
catch(err){
res.status(500).send({
   success:false,
   message:"could find keywords"
})
}
}

module.exports = {createProductController,getProductController,getSingleProductController,getPhotoController,deleteProductController,updateProductController,productFilterController,searchProductController}