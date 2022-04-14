const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
        if (value.toLowerCase().indexOf("password") > -1) {
          throw new Error("password match found !!");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number");
        }
      },
    },
    // tokens: [
    //   {
    //     token: {
    //       type: String,
    //       required: false,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);
//generate token
userSchema.methods.generateAuthToken = async function () {
  const Guser = this;
  const token = jwt.sign({ _id: Guser._id.toString() }, "thisisdemo");

//   Guser.tokens = Guser.tokens.concat({ token });
//   Guser.tokens=[]
//   Guser.tokens.push({token})
  await Guser.save();
  return token;
};
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
//Hash the plain text password before saving
userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8);
    }
    next();
})
const user = mongoose.model("User", userSchema);
module.exports = user;
