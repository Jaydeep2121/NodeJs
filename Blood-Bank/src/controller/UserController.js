const MyUser = require("../models/user_Model");
var jwt = require("jsonwebtoken");
const fs = require("fs");

//add new user data
exports.AddUser = async (req, res) => {
  try {
    const user = new MyUser({
      ...req.body,
      imageUrl: req.files,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log("e", error);
  }
};
//authenticate user
exports.authen = async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, "thisisdemo");
    if (!claims) {
      return res.status(401).send({
        message: "unauthenticate",
      });
    }
    const user = await MyUser.findOne({ _id: claims._id });
    const { password, ...data } = await user.toJSON();
    res.send(data);
  } catch (error) {
    return res.status(401).send({
      message: "unauthenticate",
    });
  }
};
//to find the search data
exports.Getsearch = async (req, res) => {
  let x = req.params?.data;
  x = x.trim();
  // if(/^\d+$/.test(x)){
  //   x = Number(x.trim());
  // }
  try {
    const userdata = await MyUser.find({
      $or: [
        { name: { $regex: x, $options: "i" } },
        { email: { $regex: x, $options: "i" } },
        { gender: { $regex: x, $options: "i" } },
        // { mobile: { $regex: x } },
      ],
    });
    if (userdata.length === 0) {
      return res.status(404).json({ data: "User List is Empty" });
    }
    return res.json({ data: userdata });
  } catch (error) {
    console.log("e", error);
  }
};
//login User
exports.loginusr = async (req, res) => {
  try {
    const user = await MyUser.findByCredentials(
      req.body.userEmail,
      req.body.userPass
    );
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: false, // for more secure and can't acces from outside if true
      nextAge: 24 * 60 * 60 * 1000, //1 day
    });
    res.send({
      message: "success",
    });
  } catch (error) {
    res.status(400).send({ message: "failed" });
  }
};
//get all user data
exports.GetUser = async (req, res) => {
  try {
    const user = await MyUser.find();
    res.json(user);
  } catch (error) {
    console.log("e", error);
  }
};
//function to update data
exports.UpdateUser = async (req, res) => {
  // var objectValue = JSON.parse(JSON.stringify(req.body));
  // const pathdata = await MyUser.find({ email: objectValue["email"] });
  // fs.unlink(pathdata[0].imageUrl[0]["path"], (err) => {
  //     if (err) return;
  // });
  const keyFields = Object.keys(req.body);
  const allowUpdate = [
    "name",
    "email",
    "gender",
    "mobile",
    "password",
    "blood_group",
  ];
  const isValidOper = keyFields.every((value) => allowUpdate.includes(value));
  if (!isValidOper) {
    return res.status(400).send({ error: "invalid updates!" });
  }
  try {
    const user = await MyUser.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        imageUrl: req.files,
      },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    console.log("e", error);
  }
};
// Get User Details By User ID
exports.editUser = async (req, res) => {
  MyUser.findById(req.params.id, function (err, usr) {
    if (err) return;
    res.json(usr);
  });
};
// Get User Details By User ID
exports.editUserEmail = async (req, res) => {
  MyUser.findOne({ email: req.params.id }, function (err, usr) {
    if (err) return;
    res.json(usr);
  });
};
//to get user details with ref data
exports.getUserRef = async (req, res) => {
  try {
    const data = await MyUser.findById(req.params.id).populate(
      "blood_group",
      "group"
    );
    res.json(data);
  } catch (error) {
    console("err", error);
  }
};
//delete userData
exports.deleteUser = async (req, res) => {
  try {
    filedata = await MyUser.findById({ _id: req.params.id });
    fs.unlink(filedata.imageUrl[0].path, (err) => {
      if (err) return;
    });
    MyUser.findByIdAndDelete({ _id: req.params.id }, async (err, data) => {
      if (err) res.json(err);
      else {
        res.json({ success: "User Deleted Successfully" });
      }
    });
  } catch (error) {
    console.log("e", error);
  }
};
