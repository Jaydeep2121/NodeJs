const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
    isLike:{
        type:Number,
        trim:true,
        default:0
    },
    isDisLike:{
        type:Number,
        trim:true,
        default:0
    },
    post_owner:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Post'
    },
    user_owner:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    }
});
const review = mongoose.model('Review',ReviewSchema);
module.exports=review;