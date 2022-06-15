const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  dob:{
    type:Date,
    required:true,
    trim:true
  },
  gender:{
    type:String,
    trim:true,
    required:true
  },
  mobile:{
      type:Number,
      trim:true,
      required:[true,'User phone number required']
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isLength(value, 7, Infinity)) {
        throw new Error("string is shorter");
      }
    },
  },
  imageUrl:[{
      type:Object
  }],
  blood_group:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Bgroup'
  },
},{timestamps:true});
//generate token
UserSchema.methods.generateAuthToken = async function () {
    const Guser = this;
    const token = jwt.sign({ _id: Guser._id.toString() }, "thisisdemo");
    await Guser.save();
    return token;
};
//Hash the plain text password before saving
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
UserSchema.pre('findOneAndUpdate', function(next) {
  if (!this._update.password) {
    return next()
  }
  bcrypt.hash(this._update.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }
    this._update.password = hash
    next()
  }) 
})
//for login credentials
UserSchema.statics.findByCredentials = async (email,password)=>{
    const CurrUser = await user.findOne({ email })
    if(!CurrUser){
        throw new Error('Unablezzz to login')
    }
    const isMatch = await bcrypt.compare(password,CurrUser.password)
    if (!isMatch) {
        throw new Error('Unableaaa to login')  
    }
    return CurrUser
}
const user = mongoose.model("User", UserSchema);
module.exports = user;