const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true,
  },
  mobile:{
      type:Number,
      trim:true,
      required:[true,'User phone number required']
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
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
},{
  collection: 'adminCol'
 });
//generate token
adminSchema.methods.generateAuthToken = async function () {
    const Guser = this;
    const token = jwt.sign({ _id: Guser._id.toString() }, "thisisdemo");
    await Guser.save();
    return token;
  };
//Hash the plain text password before saving
adminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  next();
});
//for login credentials
adminSchema.statics.findByCredentials = async (email,password)=>{
    const CurrAdmin = await admin.findOne({ email })
    if(!CurrAdmin){
        throw new Error('Unablezzz to login')
    }
    const isMatch = await bcrypt.compare(password,CurrAdmin.password)
    if (!isMatch) {
        throw new Error('Unableaaa to login')
    }
    return CurrAdmin
}
const admin = mongoose.model("Admin", adminSchema);
module.exports = admin;
