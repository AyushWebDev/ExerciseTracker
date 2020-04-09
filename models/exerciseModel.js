const express=require('express');
const mongoose=require('mongoose');

const exerciseSchema=new mongoose.Schema({
    username:{ 
        type: String
    },
    description: {
        type: String
    },
    duration:{
        type: Number
    }
});

module.exports=mongoose.model("Exercise",exerciseSchema);