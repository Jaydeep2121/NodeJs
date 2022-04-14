const mongoose = require("mongoose");
const validator = require("validator");

const postSchema = new mongoose.Schema({
    postBody:{
        type:String,
        require:true,
        trim:true,
        validate(value){
            if(validator.value==="" || validator.value===null){
                throw new Error('Empty or Null value is not allowed!')
            }
        }
    }
})

const post = mongoose.model('Post',postSchema);
module.exports=post;