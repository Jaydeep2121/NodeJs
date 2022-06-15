const mongoose = require("mongoose");
const campmodel = new mongoose.Schema({
    dob:{
        type:Date,
        required:true,
        trim:true
    },
    time:{
        type:String,
        required:true,
        trim:true
    },
    camp_name:{
        type:String,
        required: true,
        trim: true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    conducted_by:{
        type:String,
        required:true,
        trim:true
    },
    organized_by:{
        type:String,
        required:true,
        trim:true
    }
});
const camp = mongoose.model("Camp",campmodel);
module.exports=camp;