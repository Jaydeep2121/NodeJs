const mongoose = require("mongoose");
const bcomponent = new mongoose.Schema({
    component:{
        type:String,
        required: true,
        trim: true
    }
});
const bcompo = mongoose.model("bcompo",bcomponent);
module.exports=bcompo;