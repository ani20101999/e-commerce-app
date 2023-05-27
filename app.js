require("dotenv").config();
const express = require("express");
require("colors");
require("./config/db")
const authRoutes = require("./routes/authRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors")

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

app.get("/",(req,res)=>{
    res.send("hello folks")
})

app.listen(port,()=>{
    console.log(`server listening on port ${port}`.bgCyan.white)
})
