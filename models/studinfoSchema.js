const express = require("express");
const mongoose =require ("mongoose")
const validator = require("validator")


/// database schema
const studinfoData= new mongoose.Schema({
   name:{type:String, require:true},

   rollno:{type:Number, unique:true, require:true, min: 4},

   adharno:{type:Number, unique:true, require:true, min: 12},

   address:{type:String, require:true, min : 30},
   
  contact:{ type:Number, unique:true, require:true,mix : 10},
   
  email:{
    type:String,
    require:true,
    unique:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is in Invalid")
        }
    }
    },

    gender:{type:String,require:true },

    date:{type:String},
})
// created collection and add schema
const studinfo = new mongoose.model("StudentDetail",studinfoData)

module.exports = studinfo;