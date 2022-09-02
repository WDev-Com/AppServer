const express = require("express");
const mongoose =require ("mongoose")
const validator = require("validator")


const allotutilDS = new mongoose.Schema({
    TRoomno:{type:Number, unique:true, require:true, min: 4},
    TBedno:{type:String, unique:true, require:true, min: 4},
    TTableno:{type:String, unique:true, require:true, min: 4},
    ORoomno:{type:String, unique:true, require:true, min: 4},
    OBedno:{type:String, unique:true, require:true, min: 4},
    OTableno:{type:String, unique:true, require:true, min: 4},   
})


// created collection and add schema
const allothostelutilDS = new mongoose.model("HostelDetailsutils",allotutilDS)


module.exports = allothostelutilDS;