const { query } = require("express");
const express = require("express");
const { append, send } = require("express/lib/response");
const { default: mongoose } = require("mongoose");
const noticerouter= express();
const validator = require("validator");

const collecNotice = require("../models/announcement")

//Get notice student
noticerouter.get("/getnotiST", async (req,res)=>{
    try{
        const getadataN = await collecNotice.find({});
        res.status(201).send(getadataN);
    }catch(err){
        res.status(400).send(err);
    }
}) 

 //Get notice Admin
noticerouter.get("/getnotiAD", async (req,res)=>{
    try{
        const getadataA = await collecNotice.find({});
        res.status(201).send(getadataA);
    }catch(err){
        res.status(400).send(err);
    }
}) 
 //Enter new notice
noticerouter.post('/NewNote', async (req, res) => {
    try{ var noticeno = req.body.annocid
     var date = req.body.date
     var note = req.body.note 
     
     console.log("Notice No : ",noticeno)
     console.log("Date : ",date)
     console.log("Note : ",note)

     // Check if this user already exisits
     let notess = await collecNotice.findOne({annocid : req.body.annocid});
     if (notess) {
         return res.status(400).send(console.log('That Notice already exisits!'));
     }  else{
         // Insert the new user if they do not exist yet
         adnote = new collecNotice({
            annocid: req.body.annocid,
            date: req.body.date,
            note: req.body.note
        });
        await adnote.save();
        console.log("New Notice Added")
        res.status(201).send(adnote);
     } }
     catch(err){
         res.status(400).send(err);
         console.log(err)
     }
 })
 //update notice
  noticerouter.patch("/findnoticeno/:notno", async (req,res)=>{
    try{
        const noteno = req.params.notno;
       console.log("Notice No",noteno);
       let adcodN = await collecNotice.findOne({annocid  : noteno});
       if(!adcodN){
        res.status(401).send();
         console.log("Notice No Didn't Exist")
       }
       else{
      const updataadN = await collecNotice.findOneAndUpdate({annocid : noteno},req.body,{new: true });
     res.status(201).send(JSON.stringify(updataadN));
     console.log("Notice is updated");
    }}catch(err){
     res.status(500).send(err);
     console.log(err)
 }
})  


 //Delete notice
 noticerouter.delete("/findnoticenodel/:notno", async (req,res)=>{
    try{  
       const noteno = req.params.notno;
       console.log(noteno);
     const addataN = await collecNotice.findOneAndDelete({annocid : noteno});
     console.log("Data is deleted");

      res.status(201).send(JSON.stringify(addataN));
    }catch(err){
        res.status(400).send(err);
    }
   })


module.exports = noticerouter;