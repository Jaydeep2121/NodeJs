const MyUser = require("../models/user_Model");
const MyGrp = require("../models/blood_group_Model");
const fs = require("fs");

//add new user data
exports.AddUser = async (req, res) => {
  try {
    
    // const user = new MyUser({
    //   ...req.body,
    //   imageUrl: req.files,
    // });
    // await user.save();
    // res.send(user);
  } catch (error) {
    console.log("e", error);
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
//get all bGroup data
exports.GetGroup = async (req, res) => {
  try {
    const group = await MyGrp.find();
    res.json(group);
  } catch (error) {
    console.log("e", error);
  }
};
//function to update data
exports.UpdateUser = async (req, res) => {
  var objectValue = JSON.parse(JSON.stringify(req.body));
  const pathdata = await MyUser.find({ email: objectValue["email"] });
  fs.unlink(pathdata[0].imageUrl[0]["path"], (err) => {
    if (err) return;
  });
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
    const user = await MyUser.findOneAndUpdate({
      ...req.body,
      imageUrl: req.files,
    });
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
