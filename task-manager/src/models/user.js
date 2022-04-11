const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Mytask = require('./task');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true //remove the space from before and after
    },
    email:{
        type:String,
        unique:true,
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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avtar:{
        type:Buffer
    }
},{
    timestamps:true
});
//relation bet userid and localfield to foreignfield and owner
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.generateAuthToken = async function(){
    const Guser=this
    const token=jwt.sign({ _id:Guser._id.toString() },'thisisdemo')

    Guser.tokens = Guser.tokens.concat({token})
    await Guser.save()
    return token
}
//for login credentials
userSchema.statics.findByCredentials = async (email,password)=>{
    const CurrUser = await user.findOne({ email })
    if(!CurrUser){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,CurrUser.password)
    if (!isMatch) {
        throw new Error('Unable to login') 
    }
    return CurrUser
}
userSchema.methods.toJSON = function(){
    const user=this
    const userObject=user.toObject();

    delete userObject.password
    delete userObject.tokens
    delete userObject.avtar

    return userObject
}
//Hash the plain text password before saving
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8);
    }
    next()
})
//delete user task when user is removed
userSchema.pre('remove',async function(next){
    const usertask=this
    await Mytask.deleteMany({owner:usertask._id})
    next()
})

const user = mongoose.model('User',userSchema)

module.exports=user