const express = require("express");
const mongoose =require ("mongoose")
const validator = require("validator")


const allotutil = new mongoose.Schema({
    Rollno:{type:Number, unique:true, require:true, min: 4},
    Roomno:{type:String, unique:true, require:true, min: 4},
    Bedno:{type:String, unique:true, require:true, min: 4},
    Tableno:{type:String, unique:true, require:true, min: 4},
})


// created collection and add schema
const allothostelutil = new mongoose.model("HostelDetailExtra",allotutil)


module.exports = allothostelutil;