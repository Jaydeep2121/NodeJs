const express = require("express");
const MyUser = require("../models/user_Model");
const MyGrp = require("../models/blood_group_Model");
const multer = require("multer");
const fromdata = multer();
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
      imageUrl: req.files[0].path,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log("e", error);
  }
});
// for getting user data
router.get("/getUsers", async (req, res) => {
  try {
    const user = await MyUser.find().select({"name":1,"email":2,"mobile":4,"_id":0});
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
