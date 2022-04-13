const mongoose = require('mongoose')
const validator = require('validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const Mytask = require('./task')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
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
},{
    timestamps:true
});
const user = mongoose.model('User',userSchema)
module.exports=user