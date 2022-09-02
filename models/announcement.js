const express = require("express");
const mongoose =require ("mongoose")
const validator = require("validator")


const annocno = new mongoose.Schema({
    annocid:{type:String, unique:true, require:true, min: 4},
    date:{type:String, require:true},
    note:{type:String, require:true},
})


// created collection and add schema
const annocment = new mongoose.model("HostelAnnouncement",annocno)


module.exports = annocment;