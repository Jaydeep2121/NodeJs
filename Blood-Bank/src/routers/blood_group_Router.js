const express = require("express");
const blgroup = require("../models/blood_group_Model");
const router = new express.Router();

//add groups
router.post('/blg',async (req,res)=>{
    const grp = new blgroup(req.body);
    try {
        await grp.save();
        res.status(201).send(grp);
    } catch (error) {
        console.log("e", error);
        res.status(400).send(error);
    }
});
module.exports=router;
