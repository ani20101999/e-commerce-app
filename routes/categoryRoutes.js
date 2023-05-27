const express = require("express");
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware");
const {createCategoryController,updateCategoryController,getCategoryController,getSingleCategoryController,deleteCategoryController} = require("../controllers/categoryController");
const route = express.Router();

//create category
route.post("/create-category",requireSignin,isAdmin,createCategoryController);

//update category
route.put("/update-category/:id",requireSignin,isAdmin,updateCategoryController);

//read category
route.get("/get-category",getCategoryController);

//single category
route.get("/get-category/:slug",getSingleCategoryController);

//delete category
route.delete("/delete-category/:id",requireSignin,isAdmin,deleteCategoryController);

module.exports = route 