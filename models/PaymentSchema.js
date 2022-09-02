const express = require("express");
const mongoose =require ("mongoose")
const validator = require("validator")


const allot = new mongoose.Schema({
    Rollno:{type:Number, require:true, min: 4},
    Billno:{type:Number, unique:true, require:true, min: 4},
    Billtitle:{type:String,require:true},
    Billamount:{type:Number, require:true},
    Billdate:{type:String,  require:true},
    Billdue:{type:String,  require:true},
    Billstatus:{type:String,  require:true},
})

// created collection and add schema
const allotpayment = new mongoose.model("PaymentDetails",allot)

module.exports = allotpayment;