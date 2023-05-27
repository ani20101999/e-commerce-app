const express = require("express");
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware");
const {createProductController,getProductController,getSingleProductController,getPhotoController,deleteProductController,updateProductController, productFilterController,searchProductController} = require("../controllers/productController");
const formidable = require("express-formidable")
const route = express.Router();

//create a product
route.post("/create-product",requireSignin,isAdmin,formidable(),createProductController);

//update product
route.put("/update-product/:pid",requireSignin,isAdmin,formidable(),updateProductController);

//get products
route.get("/get-product",getProductController);

//get-single-product && product details
route.get("/get-product/:slug",getSingleProductController);

//get-photo
route.get("/get-photo/:pid",getPhotoController);

//delete-product
route.delete("/delete-product/:slug",requireSignin,isAdmin,deleteProductController)

//filter product
route.post("/product-filters",productFilterController)

//search product
route.get("/search/:keywords",searchProductController);


module.exports = route;