const express = require("express");
const apprvlctr = require("../controller/ApprvlCtr");
const router = new express.Router();

//add apprvl
router.post('/addApprvl',apprvlctr.addapprvl);
// for getting apprvl
router.get("/getApprvl", apprvlctr.getapprvl);
//add donorEl
router.post('/adddnrEl',apprvlctr.adddonrEl);
module.exports = router;