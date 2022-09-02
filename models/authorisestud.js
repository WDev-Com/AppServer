const express = require("express");
const { type } = require("express/lib/response");
const mongoose =require ("mongoose")
const validator = require("validator");


/// database schema
const userDatas= new mongoose.Schema({
    Username:{type:String, unique:true, require:true},
    Rollno:{type:Number, unique:true, require:true, min: 4},
})
// created collection and add schema
const userdetails = new mongoose.model("Authoriseuserdetails",userDatas)

module.exports = userdetails;