const express = require("express");
const appctr = require("../controller/AppCtr");
const router = new express.Router();

//add appoint
router.post('/addApp',appctr.Addapp);
// for getting appoint data
router.get("/getappomt", appctr.Getapp);
//for getting donor data
router.get("/getDonorAp", appctr.GetdonorApp);
//for getting donor data
router.get("/getAppRef/:id", appctr.GetAppref);
module.exports = router;