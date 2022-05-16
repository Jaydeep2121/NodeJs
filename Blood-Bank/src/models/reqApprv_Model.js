const mongoose = require("mongoose");
const reqApprv = new mongoose.Schema({
    req_data:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Brequest'
    },
    status:{
        type:String,
        required: true,
        trim: true
    },
},{ timestamps: true });
const reqApp = mongoose.model("requestap",reqApprv);
module.exports=reqApp;