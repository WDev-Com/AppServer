const express = require("express")
const app=express()
///For file opretion
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
//const fileRoutes = require('./router/filerouter');
app.use(cors());

const port = process.env.PORT ||3022 ;
app.use(express.urlencoded({
    extended : true
}))
//For getting input in json data
app.use(express.json());
//For getting input in json data file input
app.use(bodyParser.json());

//data schema import
const userSchema = require("./models/userSchema")
const studinfoSchema = require("./models/studinfoSchema")

/*///store files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Call Router of File operation
app.use('/api', fileRoutes.routes)*/

//import router of student details 
const approuter = require("./router/approuter")
app.use(approuter);

//import router of admin details
const adminrouter = require("./router/adminrouter")
app.use(adminrouter);

//Operation of Admin
const opraterouter = require("./router/opretionsrouuter")
app.use(opraterouter)

//Notice Opration
const noticerouter = require("./router/notice")
app.use(noticerouter)

app.listen(port,()=>{
console.log(`connection is setup at port ${port}`);
})
