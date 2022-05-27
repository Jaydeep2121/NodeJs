const express = require("express");
const campctr = require("../controller/CampCtr");
const router = new express.Router();
const multer = require("multer");
const fromdata = multer();

//add compo
router.post('/addCamp',campctr.Addcmp);
// for getting stock data
router.get("/getCamp", campctr.Getcamp);
//for delete data
router.get("/deleteCamp/:id", campctr.deleteCamp);
//for update User data
router.patch("/updCamp/:id",campctr.UpdateCamp);
// To Get camp Details By User ID
router.get("/editCamp/:id", campctr.editCamp);
module.exports = router;