const mongoose = require("mongoose")
// conntion to data base
connect = mongoose.connect("mongodb://localhost:27017/StudentDatabase",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("connection Sucessful")
}).catch((err)=>{
         console.log(err);
})
