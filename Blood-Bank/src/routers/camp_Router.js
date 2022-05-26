const express = require("express");
const campctr = require("../controller/CampCtr");
const router = new express.Router();

//add compo
router.post('/addCamp',campctr.Addcmp);
// for getting stock data
router.get("/getCamp", campctr.Getcamp);
module.exports = router;