const express = require("express");
const bbank = require("../models/bbank_Model");
const router = new express.Router();

//add bbank info
router.post('/bnk',async (req,res)=>{
    const bkk = new bbank(req.body);
    try {
        await bkk.save();
        res.status(201).send(bkk);
    } catch (error) {
        console.log("e", error);
        res.status(400).send(error);
    }
});
// for getting bank data
router.get("/getbank", async (req, res) => {
    try {
      const bank = await bbank.find();
      res.json(bank);
    } catch (error) {
      console.log("e", error);
    }
});
// for updating bank data
router.patch("/UpdateBank", async (req, res) => {
    try {
      const bank = await bbank.findOneAndUpdate(req.body);
      res.send(bank);
    } catch (error) {
      console.log("e", error);
    }
});
module.exports=router;
