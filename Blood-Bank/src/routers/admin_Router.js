const express = require("express");
const Adminctr = require("../controller/AdminCtr");
const router = new express.Router();

//register admin
router.post("/admin",Adminctr.Addadmin);
//login admin
router.post("/admin/login",Adminctr.loginadm);
//authenticate admin
router.get("/auth-admin",Adminctr.authen);
//logout
router.post("/logout",Adminctr.logout);
// for getting admin data
router.get("/getAdmin",Adminctr.getdata);
//for update admindata
router.patch("/UpdateAdmin",Adminctr.updAdmin);
module.exports = router;
