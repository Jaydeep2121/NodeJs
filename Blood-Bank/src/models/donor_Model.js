const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const DonorSchema = new mongoose.Schema({
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
  gender:{
    type:String,
    trim:true,
    required:true
  },
  mobile:{
      type:Number,
      trim:true,
      required:[true,'donor phone number required']
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
DonorSchema.methods.generateAuthToken = async function () {
    const Guser = this;
    const token = jwt.sign({ _id: Guser._id.toString() }, "thisisdemo");
    await Guser.save();
    return token;
};
//Hash the plain text password before saving
DonorSchema.pre("save", async function (next) {
  const donor = this;
  if (donor.isModified("password")) {
    donor.password = await bcrypt.hash(donor.password, 8);
  }
  next();
});
DonorSchema.pre('findOneAndUpdate', function(next) {
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
DonorSchema.statics.findByCredentials = async (email,password)=>{
    const CurrUser = await donor.findOne({ email })
    if(!CurrUser){
        throw new Error('Unablezzz to login')
    }
    const isMatch = await bcrypt.compare(password,CurrUser.password)
    if (!isMatch) {
        throw new Error('Unableaaa to login')  
    }
    return CurrUser
}
const donor = mongoose.model("Donor", DonorSchema);
module.exports = donor;