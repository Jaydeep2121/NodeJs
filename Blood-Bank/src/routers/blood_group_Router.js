const express = require("express");
const bldCtr = require("../controller/Blood&BankCtr");
const router = new express.Router();

//add groups
router.post('/blg',bldCtr.AddBld);
module.exports=router;