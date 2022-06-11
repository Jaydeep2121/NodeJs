const express = require("express");
const appctr = require("../controller/AppCtr");
const router = new express.Router();

//add appoint
router.post('/addApp',appctr.Addapp);
// for getting appoint data
router.get("/getappomt/:id", appctr.Getapp);
//for getting donor data
router.get("/getDonorAp", appctr.GetdonorApp);
//for getting donor data by id
router.get("/getAppRef/:id", appctr.GetAppref);
//for donor search
router.get("/getDonorSearch/:data", appctr.Getsearch);
//for delete donor data
router.get("/deleteDonor/:id", appctr.deleteDonor);
module.exports = router;