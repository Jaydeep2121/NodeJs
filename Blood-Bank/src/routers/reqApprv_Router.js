const express = require("express");
const reqCtr = require("../controller/reqApprvCtr");
const reqCtr1 = require("../controller/requestCtr");
const router = new express.Router();
const multer = require('multer');
const fromdata = multer();

//add request data
router.post("/AddReqStatus/:id",fromdata.none(),reqCtr.addRequestApp);
//add request data
router.post("/AddDeniedReqStatus/:id",fromdata.none(),reqCtr.addRequestApp);
// for getting approval data
router.get("/getUreqRef/:id", reqCtr1.Getreqapdata);
// for getting reqAppr data
router.get("/getReqAppr", reqCtr.getAllReqApp);
module.exports = router;