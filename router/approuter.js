const { query } = require("express");
const express = require("express");
const { append } = require("express/lib/response");
const { default: mongoose } = require("mongoose");
const router = express();
const validator = require("validator")
const database = require("../database/database");
const userdetail = require("../models/userSchema")
const authouserdetail = require("../models/authorisestud")
const studinfoData = require("../models/studinfoSchema");
const allotpayment = require("../models/PaymentSchema")
const hostelallot = require("../models/HostelallotSchema")


///For sign up process
router.post("/signup",async (req,res)=>{
   try{ var username = req.body.username
    var rollno = req.body.rollno
    var password = req.body.password
   
    console.log("username :"+username);
    console.log("rollno :"+rollno);
    console.log("password :"+password);
    
    let user = await userdetail.findOne({ username :   req.body.username,rollno  :  req.body.rollno});
    let usern = await userdetail.findOne({ username :   req.body.username});
    let rooln = await userdetail.findOne({ rollno  :  req.body.rollno});
    if(user){
        return res.status(401).send(console.log('user already exit'));
    }
    else if(usern) {
        return res.status(402).send(console.log('username already exit'));
    } 
    else if(rooln) {
        return res.status(403).send(console.log('roll no already exit'));
    }
    else {
    const newuser =await new userdetail({
        username: username,
        rollno : rollno,
        password :  password
    });
    newuser.save().then(()=>{
        res.status(201).send(newuser);
    });
    }}catch(err){
           res.status(400).send(err);
    }   
})



////For login process
router.post("/login", (req,res)=>{
    try{
        const query = {
            username : req.body.username,
            rollno : req.body.rollno,
            password : req.body.password
         }
         userdetail.findOne(query,(err,result)=>{
             if(result != null){
              const objloginsend = {
                  username : result.username,
                  rollno : result.rollno,
                  password : result.password
              }
              res.status(200).send(JSON.stringify(objloginsend))
             }
             else{
                res.status(404).send(err);
                console.log(err)
             }
         })
    }catch(err){
        res.status(404).send(err);
        console.log("Wrong Credentials")
    }
})

///For creating student infomation database
router.post("/register", async (req,res)=>{
   try{
    var name = req.body.name
    var rollno = req.body.rollno 
    var adharno = req.body.adharno
    var address = req.body.address
    var contact = req.body.contact
    var email = req.body.email
    var gender = req.body.gender
    var date = req.body.date

  console.log("Name     :"+name);
  console.log("Roll No  :"+rollno);
  console.log("Adhar No :"+adharno);
  console.log("Address  :"+address);
  console.log("Contact  :"+contact);
  console.log("Email Id :"+email);
  console.log("Gender   :"+gender);
  console.log("Date Of Register:"+date);
  let studuser = await studinfoData.findOne({ rollno : req.body.rollno, adharno  : req.body.adharno,
     contact  : req.body.contact,email  :  req.body.email  })
  let roool = await studinfoData.findOne({ rollno : req.body.rollno })  
  let adhar = await studinfoData.findOne({ adharno  : req.body.adharno })  
  let conta = await studinfoData.findOne({ contact  : req.body.contact })  
  let emila = await studinfoData.findOne({ email  :  req.body.email  })  

    if (studuser) {
        return res.status(400).send(console.log('That user data already exisits! '))
    }
    else if(roool){
        return res.status(401).send(console.log('That rollno already exisits! '))
    }
    else if(adhar){
        return res.status(402).send(console.log('That adharno already exisits! '))
    }
    else if(conta){
        return res.status(403).send(console.log('That contact already exisits! '))
    }
    else if(emila){
        return res.status(404).send(console.log('That email already exisits! '))
    }
    else if(!validator.isEmail(email)){
        return res.status(405).send(console.log('That email is invalid '))
    }
    else {
    const studuser = await new studinfoData({
        name    :name, 
        rollno  :rollno,
        adharno : adharno,
        address : address,
        contact : contact,
        email : email,
        gender  : gender,
        date : date,
    });
    studuser.save().then(()=>{
        res.status(201).send(studuser);
    })
}}catch(err){
           res.status(400).send(err);
    }
}); 
 
// For displaying data in recylerview
router.get("/studentdata", async (req,res)=>{
    try{
        const getdata = await studinfoData.find({});
        res.status(201).send(getdata);
    }catch(err){
        res.status(400).send(err);
    }
})     

//For taking input from user (Input = rollno) and send data to user interface
router.get("/findbyroll/:Rollno", async (req,res)=>{
       try{
          const rolld = req.params.Rollno;
          console.log(rolld);
         const getdata = await studinfoData.find({rollno : rolld});
        res.status(201).send(JSON.stringify(getdata));
    }catch(err){
        res.status(400).send(err);
    }
     
})

//Update
router.patch("/findbyroll/:Rollno", async (req,res)=>{
    try{
       const rolld = req.params.Rollno;
       console.log(rolld);
      const getdata = await studinfoData.findOneAndUpdate({rollno : rolld},req.body,{new: true });
     res.status(201).send(JSON.stringify(getdata));
     console.log("Data is updated");
 }catch(err){
     res.status(500).send(err);
 }
})

 //Delete the all data of student by admin @@@@@@@@@@@@@@@@@@@@@@@@ DANGER @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 router.delete("/findbyroll/:Rollno", async (req,res)=>{
    try{  
       const rolld = req.params.Rollno;
       console.log(rolld);
     const usdata = await userdetail.findOneAndDelete({rollno : rolld});
     console.log("Data is deleted Student User Details");

      const getdata = await studinfoData.findOneAndDelete({rollno : rolld});
      console.log("Data is deleted Student Details");

      const hsdta = await hostelallot.findOneAndDelete({rollno : rolld});
      console.log("Data is deleted Student Hostel Details");

      const paydata = await allotpayment.findOneAndDelete({rollno : rolld});
      console.log("Data is deleted Student Payment Details");

      res.status(201).send(JSON.stringify(usdata,getdata,hsdta,paydata));
      

 }catch(err){
     res.status(400).send(err);
 }
})

 //Delete the student user data information by student
 router.delete("/findbyrollforS/:Rollno", async (req,res)=>{
    try{  
       const rolld = req.params.Rollno;
       console.log(rolld);
     const usdatas = await userdetail.findOneAndDelete({rollno : rolld});
     console.log("Data is deleted Student User Details");

      const getdatas = await studinfoData.findOneAndDelete({rollno : rolld});
      console.log("Data is deleted Student Details");

      res.status(201).send(JSON.stringify(usdatas,getdatas));
      
 }catch(err){
     res.status(400).send(err);
 }
})

router.post('/studauthorise', async (req, res) => {
    try{ var username = req.body.usernames
     var roll = req.body.rollnos
    console.log("Adminusername :"+ username);
    console.log("Admincode :"+roll);
         // Insert the new user if they do not exist yet
         stuuser = new authouserdetail({
            Username: req.body.usernames,
            Rollno: req.body.rollnos,
         })
         await stuuser.save();
         console.log("Signup Sucessfully Authorised Admin")
         res.status(201).send(stuuser);
     
    }catch(err){
         res.status(400).send(err);
         console.log(err)
     }
 })

  //Update login password
  router.patch("/studentpassup/:rollno", async (req,res)=>{
    try{
        const rolll = req.params.rollno;
       console.log("Roll No",rolll);
       let rollnn = await userdetail.findOne({rollno  :  req.body.rollno});
       if(rollnn){
        res.status(401).send();
         console.log("Wrong Roll NO")
       }
       else{
      const updatast = await userdetail.findOneAndUpdate({rollno : rolll},req.body,{new: true });
     res.status(201).send(JSON.stringify(updatast));
     console.log("Password is updated");}
 }catch(err){
     res.status(500).send(err);
 }
})  

module.exports = router;