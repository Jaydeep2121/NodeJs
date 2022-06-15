const mongoose = require("mongoose");
const eligModel = new mongoose.Schema({
    last_donate:{
        type:Date,
        default:null,
        trim:true
    },
    weight:{
        type:Number,
        required:true,
        trim:true
    },
    hemog:{
        type:String,
        required:true,
        trim:true
    },
    refuser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status:{
        type:String,
        trim:true,
        default:'pending'
    }
});
const elig = mongoose.model("donorEli", eligModel);
module.exports = elig;
