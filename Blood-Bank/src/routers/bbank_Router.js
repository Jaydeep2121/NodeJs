const express = require("express");
const BankCtr=require("../controller/Blood&BankCtr");
const router = new express.Router();

//add bbank info
router.post('/bnk',BankCtr.addBank);
// for getting bank data
router.get("/getbank", BankCtr.getData);
// for updating bank data
router.patch("/UpdateBank", BankCtr.updateData);
module.exports=router;
