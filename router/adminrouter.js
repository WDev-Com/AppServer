const { query } = require("express");
const express = require("express");
const { append, send } = require("express/lib/response");
const { default: mongoose } = require("mongoose");
const adminrouter= express();
const validator = require("validator");
const database = require("../database/database");
const adminuserdetail = require("../models/adminSchema");
const admininfoData = require("../models/admininfoSchema");
const AuthorityDetails = require("../models/authoriseadmin")


 /////////////Admin signup already registery check   @@@@@@@@@@@@@@@@@@@@@@@@@@ IMP @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 adminrouter.post('/adminsignup', async (req, res) => {
    try{ var adusername = req.body.adusername
     var admincode = req.body.admincode
     var adminpassword = req.body.adminpassword 
 
    console.log("Adminusername :"+ adusername);
    console.log("Admincode :"+admincode);
    console.log("Adminpassword :"+adminpassword);

     // Check if this user already exisits
     let aduser = await adminuserdetail.findOne({ adusername :   req.body.adusername, admincode  :  req.body.admincode});
     let aduse = await adminuserdetail.findOne({ adusername :   req.body.adusername});
     let adcod = await adminuserdetail.findOne({admincode  :  req.body.admincode});
     if (aduser) {
         return res.status(400).send(console.log('That user already exisits!'));
     } else if(aduse){
        return res.status(401).send(console.log('That username already exisits!'));
      }
      else if(adcod){
        return res.status(402).send(console.log('That admincode already exisits!'));
      }
      else {
        let aduser = await AuthorityDetails.findOne({Adusername : adusername});
        let adcode = await AuthorityDetails.findOne({Admincode : admincode});
     if(!aduser || !adcode){
            res.status(403).send()
            console.log("Not Authorise")
     } else{
         // Insert the new user if they do not exist yet
         aduser = new adminuserdetail({
            adusername: req.body.adusername,
            admincode: req.body.admincode,
            adminpassword: req.body.adminpassword
        });
        await aduser.save();
        console.log("Signup Sucessfully Authorised Admin")
        res.status(201).send(aduser);
     } }  }
     catch(err){
         res.status(400).send(err);
         console.log(err)
     }
 })
////For login process
adminrouter.post("/adminlogin",(req,res)=>{
    try{
        const query = {
            adusername : req.body.adusername,
            admincode : req.body.admincode,
            adminpassword: req.body.adminpassword
        }
        adminuserdetail.findOne(query,(err,result)=>{
            if(result != null){
             const adminloginsend = {
                 adusername : result.adusername,
                 admincode : result.admincode,
                 adminpassword : result.adminpassword
                }
             res.status(200).send(JSON.stringify(adminloginsend))
            }
            else{
                res.status(404).send(err);
                console.log(err)
             }
         })
    }
    catch(err){
        res.status(404).send((err)=>{
            console.log("error from user interface") })
    }
    
})

///For creating Admin infomation database
adminrouter.post("/adminregister",async(req,res)=>{
    try{
        var adminname = req.body.adminname
        var admincode = req.body.admincode
        var adminaddress = req.body.adminaddress
        var admincontact = req.body.admincontact
        var adminemail = req.body.adminemail
        
        
      console.log("Adminname     :"+adminname);
      console.log("Admincode  :"+admincode);
      console.log("Address :"+adminaddress);
      console.log("Contct  :"+admincontact);
      console.log("Email  :"+adminemail);
     
      let addata = await admininfoData.findOne({ adusername :   req.body.adusername, admincode  :  req.body.admincode,
        admincontact  :  req.body.admincontact,adminemail  :  req.body.adminemail});
      let adus = await admininfoData.findOne({ adminname :   req.body.adminname});
      let adco = await admininfoData.findOne({admincode  :  req.body.admincode});
      let adcon = await admininfoData.findOne({admincontact  :  req.body.admincontact});
      let ademl = await admininfoData.findOne({adminemail  :  req.body.adminemail});
      if (addata) {
          return res.status(400).send(console.log('That user already exisits!'));
      }
      else if(adus){
        return res.status(401).send(console.log('That username already exisits!'));
      }
      else if(adco){
        return res.status(402).send(console.log('That admincode already exisits!'));
      }
      else if(adcon){
        return res.status(403).send(console.log('That contact already exisits!'));
      }
      else if(ademl){
        return res.status(404).send(console.log('That Email already exisits!'));
      }
      else if(!validator.isEmail(adminemail)){
        return res.status(405).send(console.log('That email is invalid '))
    }
       else {
        const addata =await new admininfoData({
            adminname:adminname,
            admincode  :admincode,
            adminaddress : adminaddress,
            admincontact: admincontact,
            adminemail : adminemail
        });
        addata.save().then(()=>{
            console.log("Admin Registration Sucessfully")
                res.status(201).send(addata)
            })
    }}
    catch(err){
        res.status(400).send(err);
    } 
})

 //Delete
 adminrouter.delete("/admindelete/:code", async (req,res)=>{
    try{  
       const codeq = req.params.code;
       console.log(codeq);
     const addata = await adminuserdetail.findOneAndDelete({rollno : codeq});
     console.log("Data is deleted Admin User Details");

      const adinfodata = await admininfoData.findOneAndDelete({rollno : codeq});
      console.log("Data is deleted Admin Details");

      res.status(201).send(JSON.stringify(addata,adinfodata));
    }catch(err){
        res.status(400).send(err);
    }
   })



adminrouter.post('/adminauthorise', async (req, res) => {
    try{ var adusername = req.body.adusername
     var admincode = req.body.admincode
    console.log("Adminusername :"+ adusername);
    console.log("Admincode :"+admincode);
         // Insert the new user if they do not exist yet
         aaduser = new AuthorityDetails({
            Adusername: req.body.adusername,
            Admincode: req.body.admincode,
         })
         await aaduser.save();
         console.log("Signup Sucessfully Authorised Admin")
         res.status(201).send(aaduser);
     
    }catch(err){
         res.status(400).send(err);
         console.log(err)
     }
 })


 //Update login password
 adminrouter.patch("/adminpassup/:admincode", async (req,res)=>{
    try{
        const admincodes = req.params.admincode;
       console.log("Admin code",admincodes);
       let adcod = await adminuserdetail.findOne({admincode  : req.body.admincode});
       if(adcod){
        res.status(401).send();
         console.log("Wrong admin code")
       }
       else{
      const updataad = await adminuserdetail.findOneAndUpdate({admincode : admincodes},req.body,{new: true });
     res.status(201).send(JSON.stringify(updataad));
     console.log("Password is updated");}
 }catch(err){
     res.status(500).send(err);
 }
})  
// For displaying data in recylerview
adminrouter.get("/admindatainfo", async (req,res)=>{
    try{
        const getadata = await admininfoData.find({});
    
        res.status(201).send(getadata);
    }catch(err){
        res.status(400).send(err);
    }
})   
module.exports = adminrouter;