const mongoose = require("mongoose");
const bank = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    contact:{
        type:Number,
        required:true,
        trim:true
    },
    timing:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    img:{
        type:String
    }
});
const bbank = mongoose.model("Bbank",bank);
module.exports=bbank;