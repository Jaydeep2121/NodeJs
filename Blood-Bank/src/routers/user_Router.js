const express = require("express");
const userContr = require("../controller/UserController");
const FileUpl = require("../controller/FileUpload");
const router = new express.Router();

//for save User data
router.post("/users", FileUpl.upload.array("imageUrl", 1), userContr.AddUser);
//for update User data
router.patch(
  "/UpdateUser/:id",
  FileUpl.upload.array("imageUrl", 1),
  userContr.UpdateUser
);
// To Get User Details By User ID
router.get("/editUser/:id", userContr.editUser);
//to get user details with ref data
router.get("/getUserRef/:id", userContr.getUserRef);
//for delete data
router.get("/deleteUser/:id", userContr.deleteUser);
// for getting user data
router.get("/getUsers", userContr.GetUser);
module.exports = router;
