const express = require("express");
const mongoose =require ("mongoose")
const validator = require("validator")


/// database schema
const admininfoData= new mongoose.Schema({
    adminname:{type:String, require:true},

    admincode:{type:Number, unique:true, require:true, min: 4},

    adminaddress:{type:String,require:true, min: 12},

    admincontact:{type:Number, require:true, min : 30},

  adminemail:{
    type:String,
    require:true,
    unique:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is in Invalid")
        }
    }
    }
})
// created collection and add schema
const admininfo = new mongoose.model("AdminDetails",admininfoData)

module.exports =  admininfo;