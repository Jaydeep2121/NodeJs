const express = require("express");
const MyUser = require("../models/user_Model");
const MyGrp = require("../models/blood_group_Model");
const multer = require("multer");
const fromdata = multer();
const fs = require("fs");
const router = new express.Router();

var FileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../NodeJS/Blood-Bank/public/images");
  },
  filename: (req, file, cb) => {
    var filetype = "";
    if (file.mimetype === "image/jpeg") {
      filetype = "jpeg";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});
var upload = multer({ storage: FileStorage });

//for save data
router.post("/users", upload.array("imageUrl", 1), async (req, res) => {
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
});
//for update data
router.patch("/UpdateUser", upload.array("imageUrl", 1), async (req, res) => {
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
});
// To Get User Details By User ID
router.get("/editUser/:id", async (req, res) => {
  MyUser.findById(req.params.id, function (err, usr) {
    if (err) return;
    res.json(usr);
  });
});
//for delete data
router.get("/deleteUser/:id", async (req, res) => {
  /*
    filedata = await MyUser.findById({ _id: req.params.id });
    fs.readdir(filedata.imageUrl.toString(), (err, file) => {
      if (err) throw err;
      fs.unlink(filedata.imageUrl);
    });
  */
  MyUser.findByIdAndDelete({ _id: req.params.id }, async (err, data) => {
    if (err) res.json(err);
    else {
      res.json({ success: "Employee Deleted Successfully" });
    }
  });
});
// for getting user data
router.get("/getUsers", async (req, res) => {
  try {
    const user = await MyUser.find();
    res.json(user);
  } catch (error) {
    console.log("e", error);
  }
});
// for getting bloodgroup
router.get("/getGroups", async (req, res) => {
  try {
    const group = await MyGrp.find();
    res.json(group);
  } catch (error) {
    console.log("e", error);
  }
});
module.exports = router;
