const express = require("express");
const BankCtr = require("../controller/Blood&BankCtr");
const FileUpl = require("../controller/FileUpload");
const router = new express.Router();

//add bbank info
router.post("/bnk", FileUpl.upload.array("imageUrl", 1), BankCtr.addBank);
// for getting bank data
router.get("/getbank", BankCtr.getData);
// for updating bank data
router.patch(
  "/UpdateBank",
  FileUpl.upload.array("imageUrl", 1),
  BankCtr.updateData
);
module.exports = router;
