
const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const exerciseSchema=new mongoose.Schema({
    username:{ 
        type: String
    },
    description: {
        type: String
    },
    duration:{
        type: Number
    },
    postedby:{
        type: ObjectId,
        ref: "User"
    }
});

module.exports=mongoose.model("Exercise",exerciseSchema);