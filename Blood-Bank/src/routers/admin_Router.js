const express = require("express");
var jwt = require('jsonwebtoken');
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
        res.cookie('jwt',token,{
            httpOnly:false, // for more secure and can't acces from outside if true
            nextAge:24*60*60*1000 //1 day
        })
        res.send({
            message:'success'
        });
    } catch (error) {
        console.log('e',error);
        res.status(400).send(error);
    }
})
//authenticate admin
router.get('/auth-admin',async (req,res)=>{
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie,'thisisdemo');
        if(!claims){
            return res.status(401).send({
                message:'unauthenticate'
            })
        }
        const admin = await Myadmin.findOne({_id:claims._id});
        const {password,...data} = await admin.toJSON();
        res.send(data);   
    } catch (error) {
        return res.status(401).send({
            message:'unauthenticate'
        })
    }
})
//logout 
router.post('/logout',async (req,res)=>{
    res.cookie('jwt',null,{maxAge:0})
    res.send({
        message:'logout success'
    })
})
module.exports=router;