const mongoose = require("mongoose");
const validator = require("validator");

const topicSchema = new mongoose.Schema({
        title:{
            type:String,
            require:true,
            trim:true,
            validate(value){
                if(validator.value==="" || validator.value===null){
                    throw new Error('Empty or Null value is not allowed!')
                }
            }
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            require:true,
            ref:'User'
        }
    }
)
const topic = mongoose.model('Topic',topicSchema)
module.exports=topic