const express = require("express");
const Adminctr = require("../controller/AdminCtr");
const FileUpl = require("../controller/FileUpload");
const router = new express.Router();

//register admin
router.post("/admin",FileUpl.upload.array("imageUrl", 1),Adminctr.Addadmin);
//login admin
router.post("/admin/login",Adminctr.loginadm);
// To Forget Password
router.post("/AdminforgetPass", Adminctr.forPass);
//authenticate admin
router.get("/auth-admin",Adminctr.authen);
//logout
router.post("/logout",Adminctr.logout);
// for getting admin data
router.get("/getAdmin",Adminctr.getdata);
//for update admindata
router.patch("/UpdateAdmin",FileUpl.upload.array("imageUrl", 1),Adminctr.updAdmin);
module.exports = router;
