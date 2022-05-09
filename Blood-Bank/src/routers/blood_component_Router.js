const express = require("express");
const bldCtr = require("../controller/Blood&BankCtr");
const router = new express.Router();

//add compo
router.post('/blc',bldCtr.AddCmd);
module.exports=router;
