const { query } = require("express");
const express = require("express");
const { append } = require("express/lib/response");
const { default: mongoose } = require("mongoose");
const opraterouter = express();

const database = require("../database/database");
const allotpayment = require("../models/PaymentSchema")
const hostelallot = require("../models/HostelallotSchema")
const allothostelutilDS = require("../models/Hostelutilschema");
const res = require("express/lib/response");

//Insert hostel details
opraterouter.post("/hostelallot", async (req,res)=>{
    try{
        var Rollno = req.body.Rollno
        var Roomno = req.body.Roomno
        var Bedno = req.body.Bedno 
        var Tableno = req.body.Tableno

      console.log("Room No:"+Rollno);
      console.log("Room No:"+Roomno);
      console.log("Bed No :"+Bedno);
      console.log("Bed No :"+Tableno);
      let studhosal = await hostelallot.findOne({Rollno : req.body.Rollno ,Roomno : req.body.Roomno,
        Bedno : req.body.Bedno,Tableno : req.body.Tableno  })
      let roal = await hostelallot.findOne({Rollno : req.body.Rollno })    
      let roou = await hostelallot.findOne({Roomno : req.body.Roomno })  
      let buds = await hostelallot.findOne({Bedno : req.body.Bedno })  
      let tabe = await hostelallot.findOne({Tableno : req.body.Tableno  })  
    if(studhosal){
        return res.status(400).send(console.log('That hostel data already exisits! '))
        }
    else if(roal){
          return res.status(401).send(console.log('That Rollno already exisits! '))
          }
    else if(roou){
        return res.status(402).send(console.log('That Room no data already exisits! '))
        }
    else if(buds){
         return res.status(403).send(console.log('That Bed no data already exisits! '))
        }  
    else if(tabe){
        return res.status(404).send(console.log('That Table no data already exisits! '))
        }                                         
    else{
      const setallot = await new hostelallot({
            Rollno : Rollno,
            Roomno : Roomno, 
            Bedno  : Bedno,
            Tableno: Tableno,
        });
        setallot.save().then(()=>{
        res.status(201).send(setallot);
    })
      console.log("Hostel data is saved");
  }}catch(err){
      res.status(500).send(err);
      console.log(err);
  }
    }); 

///Display all Hostel Details to admin
opraterouter.get("/AllHostelDe", async (req,res)=>{
    try{
        const getbdata = await hostelallot.find({});
         res.status(201).send(getbdata);
     }catch(err){
         res.status(400).send(err);
     }
    })


//For taking input from user (Input = rollno) and send data to user interface Hostel Allotment data
opraterouter.get("/Hfindbyroll/:Rolln", async (req,res)=>{
    try{
       const rollm = req.params.Rolln;
       console.log(rollm);
      const getHdata = await hostelallot.find({Rollno : rollm});
     res.status(201).send(JSON.stringify(getHdata));
 }catch(err){
     res.status(400).send(err);
 }
})

//update hostel allotment
opraterouter.patch("/findHDbyroll/:Rollno", async (req,res)=>{
    try{
       const rolld = req.params.Rollno;
       console.log(rolld);
      const uphdata = await hostelallot.findOneAndUpdate({Rollno : rolld},req.body,{new: true });
     res.status(201).send(JSON.stringify(uphdata));
     console.log("Data is updated");
 }catch(err){
     res.status(500).send(err);
 }
})

 //Delete Hostel allotment
 opraterouter.delete("/findHDbyroll/:Rollno", async (req,res)=>{
    try{  
        const rolld = req.params.Rollno;
        console.log(rolld);
      const delhdata = await hostelallot.findOneAndDelete({Rollno : rolld});
      res.status(201).send(JSON.stringify(delhdata));
      console.log("Hostel details is deleted");

 }catch(err){
     res.status(400).send(err);
 }
})


//Payment data Allotment
opraterouter.post("/paymentallot", async (req,res)=>{
    try{  
        var Rollno = req.body.Rollno
        var Billno = req.body.Billno
        var Billtitle = req.body.Billtitle 
        var Billamount = req.body.Billamount
        var Billdate = req.body.Billdate
        var Billdue = req.body.Billdue
        var Billstatus = req.body.Billstatus

      console.log("Rollno:"+Rollno);
      console.log("Billno:"+Billno);
      console.log("Billtitle :"+Billtitle);
      console.log("Billamount :"+Billamount);
      console.log("Billdate:"+Billdate);
      console.log("Billdue :"+Billdue);
      console.log("Billstatus :"+Billstatus);

     let biln = await allotpayment.findOne({ Billno : req.body.Billno  })  
     if(biln){
        return res.status(401).send(console.log('That Billno already exisits!'));
     }
     else {  
     const setpayallot = await new allotpayment({
            Rollno : Rollno,
            Billno : Billno, 
            Billtitle  : Billtitle,
            Billamount: Billamount,
            Billdate: Billdate,
            Billdue: Billdue,
            Billstatus: Billstatus
        });
        setpayallot.save().then(()=>{
        res.status(201).send(setpayallot);
    })
      console.log("Payment data is saved");
  }}catch(err){
      res.status(500).send(err);
      console.log(err);
  }
    }); 
///Find bills with specific roll no
opraterouter.get("/findbillbyroll/:Rolln", async (req,res)=>{
    try{
           const rollm = req.params.Rolln;
           console.log(rollm);
          const getbdata = await allotpayment.find({Rollno : rollm});
         res.status(201).send(JSON.stringify(getbdata));
     }catch(err){
         res.status(400).send(err);
     }
      
    })

///Display bills to admin
opraterouter.get("/AllPaymentsD", async (req,res)=>{
    try{
        const getbdata = await allotpayment.find({});
         res.status(201).send(getbdata);
     }catch(err){
         res.status(400).send(err);
     }
    })

//update bill
opraterouter.patch("/findbillbyroll/:billno", async (req,res)=>{
    try{
       const billd = req.params.billno;
       console.log(billd);
      const updata = await allotpayment.findOneAndUpdate({Billno : billd},req.body,{new: true });
     res.status(201).send(JSON.stringify(updata));
     console.log("Data is updated");
 }catch(err){
     res.status(500).send(err);
 }
})

//Update status
opraterouter.patch("/findbillforstatus/:billno", async (req,res)=>{
    try{
        const billd = req.params.billno;
       console.log(billd);
      const updata = await allotpayment.findOneAndUpdate({Billno : billd},req.body,{new: true });
     res.status(201).send(JSON.stringify(updata));
     console.log("Status is updated");
 }catch(err){
     res.status(500).send(err);
 }
})  

 //Delete one bill
 opraterouter.delete("/findbillbyroll/:billno", async (req,res)=>{
    try{  
       const billd = req.params.billno;
       console.log(billd);
      const deldata = await allotpayment.findOneAndDelete({Billno : billd});
      res.status(201).send(JSON.stringify(deldata));
      console.log("Bill is deleted");

 }catch(err){
     res.status(400).send(err);
 }
})

//Delete All bills
opraterouter.delete("/findbyrolldelall/:Rollno", async (req,res)=>{
    try{  
       const rolld = req.params.Rollno;
       console.log(rolld);
      const delall = await allotpayment.deleteMany({Rollno : rolld});
      res.status(201).send(JSON.stringify(delall));
      console.log("All bills is deleted");
 }catch(err){
     res.status(400).send(err);
 }
})

//Display Total no of hostels things And room no and count of occupied 
opraterouter.get("/Counter",async(req,res)=>{
       try{
        const Totalroom = 50
        const Totalbeds = 150
        const Totaltable =  150
       // const result = await hostelallot.countDocuments();
        const occupiedroom = await hostelallot.distinct("Roomno").countDocuments();
        const occupiedbed = await hostelallot.distinct("Bedno").countDocuments();
        const occupiedtable = await hostelallot.distinct("Tableno").countDocuments();

         const Tdata =await new allothostelutilDS({
            TRoomno     : Totalroom,
            TBedno     : Totalbeds,
            TTableno    :  Totaltable,
            ORoomno  : occupiedroom,
            OBedno  : occupiedbed,
            OTableno :  occupiedtable
        })
        
        Tdata.save().then(()=>{
            res.status(201).send(JSON.stringify(Tdata))
        })
       

        console.log("Total Rooms    :",Totalroom)
        console.log("Total Beds     :",Totalbeds)
        console.log("Total Tables   :",Totaltable)
        console.log("Occupied Rooms :",occupiedroom)
        console.log("Occupied Beds  :",occupiedbed)
        console.log("Occupied Tables:",occupiedtable)
     
    }
     catch(err){
          res.status(400).send("Error")
         console.log(err)  
        }
    })
    
///Update utils data
const updatedocument = async(_id) =>{
   try{
        // const result = await hostelallot.countDocuments();
        const occupiedroom = await hostelallot.distinct("Roomno").countDocuments();
        const occupiedbed = await hostelallot.distinct("Bedno").countDocuments();
        const occupiedtable = await hostelallot.distinct("Tableno").countDocuments(); 
    const result = await allothostelutilDS.updateOne({_id},{
       $set :{
        ORoomno  : occupiedroom,
        OBedno  : occupiedbed,
        OTableno :  occupiedtable
       }
   })
}catch(err){
   res.status(500).send(console.log("Error!!!!!!!!"));
}
}
const callerfuc = async() =>{
    // const result = await hostelallot.countDocuments();
    const occupiedroom = await hostelallot.distinct("Roomno").countDocuments();
    const occupiedbed = await hostelallot.distinct("Bedno").countDocuments();
    const occupiedtable = await hostelallot.distinct("Tableno").countDocuments(); 

let odroom = await allothostelutilDS.findOne({ORoomno  : occupiedroom})    
let obed = await allothostelutilDS.findOne({OBedno  : occupiedbed})  
let otable = await allothostelutilDS.findOne({OTableno :  occupiedtable})  
if(odroom || obed || otable){
    console.log("Already Exit")}
  else{
    updatedocument("6273e3eb453b2d9400ff6433")
}
}
///Display bills to admin
opraterouter.get("/Counterget", async (req,res)=>{
    try{
        const getUdata = await allothostelutilDS.find({});
        callerfuc()
         res.status(201).send(getUdata);
     }catch(err){
         res.status(400).send(err);
     }
    })
module.exports = opraterouter;





