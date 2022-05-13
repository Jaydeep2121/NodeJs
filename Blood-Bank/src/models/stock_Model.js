const mongoose = require("mongoose");
const Mstock = new mongoose.Schema({
    volume:{
        type:Number,
        required: true,
        trim: true
    },
    day_left:{
        type:Number,
        required:true,
        trim:true
    },
    blood_group:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'Bgroup'
    }
},{timestamps:true});
const stock = mongoose.model("Bstock",Mstock);
module.exports=stock;