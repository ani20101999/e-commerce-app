const mongoose = require("mongoose");
require("colors")

 const mongodb = mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("db connected successfully".bgCyan)
})
.catch(()=>{
    console.log("db connection failed".bgRed)
})
module.exports = mongodb