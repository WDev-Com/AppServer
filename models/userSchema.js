const express = require("express");
const { type } = require("express/lib/response");
const mongoose =require ("mongoose")
const validator = require("validator");


/// database schema
const userData= new mongoose.Schema({
    username:{type:String, unique:true, require:true},

    rollno:{type:Number, unique:true, require:true, min: 4},

    password:{type:String, require:true, min:6}
})
// created collection and add schema
const userdetail = new mongoose.model("Userdetails",userData)

module.exports = userdetail;