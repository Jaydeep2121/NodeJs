const mongoose = require('mongoose');
const validator = require('validator');
const user = mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true //remove the space from before and after
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true, //convert to lowercase
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if (!validator.isLength(value, 7, Infinity)) {
                throw new Error('string is shorter');
            }
            if (value.toLowerCase().indexOf('password') > -1){   
                throw new Error('password match found !!');
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if (value<0) {
                throw new Error("Age must be a positive number");
            }
        }
    }
})

module.exports=user