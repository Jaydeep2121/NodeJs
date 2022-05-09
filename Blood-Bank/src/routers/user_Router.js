const express = require("express");
const userContr = require("../controller/UserController");
const FileUpl = require("../controller/FileUpload");
const router = new express.Router();

//for save User data
router.post("/users", FileUpl.upload.array("imageUrl", 1), userContr.AddUser);
//for update User data
router.patch("/UpdateUser", FileUpl.upload.array("imageUrl", 1), userContr.UpdateUser);
// To Get User Details By User ID
router.get("/editUser/:id", userContr.editUser);
//for delete data
router.get("/deleteUser/:id", userContr.deleteUser);
// for getting user data
router.get("/getUsers", userContr.GetUser);
// for getting bloodgroup
router.get("/getGroups", userContr.GetGroup);
module.exports = router;