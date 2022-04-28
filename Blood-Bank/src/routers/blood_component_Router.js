const express = require("express");
const blcomp = require("../models/blood_component_Model");
const router = new express.Router();

//add compo
router.post('/blc',async (req,res)=>{
    const grp = new blcomp(req.body);
    try {
        await grp.save();
        res.status(201).send(grp);
    } catch (error) {
        console.log("e", error);
        res.status(400).send(error);
    }
});
module.exports=router;
