const express = require("express");
const StockCtr = require("../controller/StockCtr");
const router = new express.Router();
const multer = require('multer');
const fromdata = multer();

//add stock data
router.post("/CreStock",fromdata.none(),StockCtr.Addstock);
// To Get Stock Details By Stock ID
router.get("/editStock/:id", StockCtr.editStock);
//to get user details with ref data
router.get("/getStockRef/:id", StockCtr.getStockRef);
//for delete data
router.get("/deleteStock/:id", StockCtr.deleteStock);
//for update data
router.patch("/UpdateStockdata",fromdata.none(),StockCtr.UpdateStock);
// for getting stock data
router.get("/getStock", StockCtr.Getstock);
module.exports = router;