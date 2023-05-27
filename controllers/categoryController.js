const categoryModel = require("../models/categoryModel");
const slugify = require("slugify")
const createCategoryController = async(req,res)=>{
try{
 const {name} = req.body;
 if(!name){
    return res.status(404).send({
        message:"invalid category name"
    });
}
   const existingCategory = await categoryModel.findOne({name});
   if(existingCategory){
      res.status(200).send({
        message:"category already exists!!"
      })
   } 

   const Category = await categoryModel.create({name:name,slug:slugify(name)});
   res.status(200).send({
    success:true,
    message:"category created successfully",
    Category
   })
 
}
catch(err){
    console.log(err);
    res.status(500).send({
        success:true,
        message:"invalid category"
    })
}
}


  const updateCategoryController = async(req,res)=>{
try{
 const{id} = req.params;
 const {name} = req.body;
 const update = await categoryModel.findByIdAndUpdate(id,{name:name,slug:slugify(name)},{new:true});
 res.status(201).send({
    success:true,
    message:"name updated successfully",
    update
 })
}
catch(err){
console.log(err);
res.status(500).send({
    success:false,
    message:"update failed"
})
}
}


const getCategoryController = async(req,res)=>{
const categories = await categoryModel.find({});
res.status(201).send({
    success:true,
    message:"categories",
    categories
}) 
}

const getSingleCategoryController = async(req,res)=>{
    const {slug} = req.params
    const Singlecategory = await categoryModel.findOne({slug});
    res.status(201).send({
        success:true,
        message:"category",
        Singlecategory
    }) 
    }

  
 const deleteCategoryController = async(req,res)=>{
    const {id} = req.params
    const deleteCategory = await categoryModel.findByIdAndDelete(id);
    res.status(201).send({
        success:true,
        message:"delete category",
        deleteCategory
    })
 } 

module.exports = {createCategoryController,updateCategoryController,getCategoryController,getSingleCategoryController,deleteCategoryController}