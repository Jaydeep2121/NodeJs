const express = require("express");
const apprvlctr = require("../controller/ApprvlCtr");
const router = new express.Router();

//add apprvl
router.post('/addApprvl',apprvlctr.addapprvl);
// for getting apprvl
router.get("/getApprvl", apprvlctr.getapprvl);
//for getting donorEl spec record
router.get('/getdnrEl/:id',apprvlctr.getDonrEl);
//update donorEl
router.post('/upddnrEl/:id',apprvlctr.updateDonrEl);
//add donorEl
router.post('/adddnrEl/:id',apprvlctr.adddonrEl);
module.exports = router;