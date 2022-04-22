const express = require("express");
const Myadmin = require("../models/admin_Model");
const router = new express.Router();

//register admin
router.post('/admin',async (req,res)=>{
    const admin = new Myadmin(req.body);
    try {
        await admin.save();
        res.status(201).send(admin)
    } catch (error) {
        console.log("e", error);
        res.status(400).send(error);
    }
});
//login admin
router.post('/admin/login',async (req,res)=>{
    try {
        const admin = await Myadmin.findByCredentials(req.body.email,req.body.password);
        const token = await admin.generateAuthToken();
        res.status(201).send({admin,token});
    } catch (error) {
        console.log('e',error);
        res.status(400).send(error);
    }
})
module.exports=router;