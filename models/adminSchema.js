const express = require("express");
const { type } = require("express/lib/response");
const mongoose =require ("mongoose")


/// database schema
const adminuserData= new mongoose.Schema({
    adusername:{type:String, require:true},

    admincode:{type:Number, unique:true, require:true, min: 4},

    adminpassword:{type:String, require:true, min:6}
})
// created collection and add schema
const adminuserdetail = new mongoose.model("Adminuserdata",adminuserData)

module.exports = adminuserdetail;