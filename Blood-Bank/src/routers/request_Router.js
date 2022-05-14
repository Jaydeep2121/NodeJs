const express = require("express");
const reqCtr = require("../controller/requestCtr");
const router = new express.Router();
const multer = require('multer');
const fromdata = multer();

//add request data
router.post("/CreRequest",fromdata.none(),reqCtr.addRequest);
// for getting stock data
router.get("/getReqData", reqCtr.Getreqdata);
module.exports = router;