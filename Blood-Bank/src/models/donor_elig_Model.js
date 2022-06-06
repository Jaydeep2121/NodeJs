const mongoose = require("mongoose");
const eligModel = new mongoose.Schema({
    last_donate:{
        type:Date,
        required:true,
        trim:true
    },
    dob:{
        type:Date,
        required:true,
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
    }
});
const elig = mongoose.model("donorEli", eligModel);
module.exports = elig;
