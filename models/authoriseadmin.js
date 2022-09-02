const express = require("express");
const { type } = require("express/lib/response");
const mongoose =require ("mongoose")


/// database schema
const AuthorityData= new mongoose.Schema({
    Adusername:{type:String, require:true},
    Admincode:{type:Number, unique:true, require:true, min: 4},
})
// created collection and add schema
const AuthorityDetails = new mongoose.model("Authority",AuthorityData)

module.exports = AuthorityDetails;