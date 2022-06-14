const express = require("express");
const appctr = require("../controller/AppCtr");
const router = new express.Router();

//add appoint
router.post('/addApp',appctr.Addapp);
// for getting appoint data
router.get("/getappomt/:id", appctr.Getapp);
// for getting appoint data
router.post("/getupdateappomt/:uid/:cid", appctr.Updateapp);
// for getting appoint data
router.get("/getpatchappomt/:uid/:cid", appctr.Getpatchapp);
//for getting donor data
router.get("/getDonorAp", appctr.GetdonorApp);
//for getting donor data by id
router.get("/getAppRef/:id", appctr.GetAppref);
//for donor search
router.get("/getDonorSearch/:data", appctr.Getsearch);
//for delete donor data
router.get("/deleteDonor/:id", appctr.deleteDonor);
//for delete donor data by camp
router.get("/deleteDonorByCamp/:id", appctr.deleteDonorCamp);
module.exports = router;