const mongoose = require("mongoose");
const blgroup = new mongoose.Schema({
    group:{
        type:String,
        required: true,
        trim: true
    }
});
const group = mongoose.model("Bgroup",blgroup);
module.exports=group;