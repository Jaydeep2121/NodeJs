const express = require('express');
const MyUser = require('../models/user');
const router = new express.Router();

//for save data
router.post('/users',async (req,res)=>{
    const user = new MyUser(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})
//for getting data
router.get('/users',async (req,res)=>{
    try {
        const user = await MyUser.find({});
        res.send(user);
    } catch (error) {
        res.status(500).send(err);
    }
})
router.get('/users/:id',async (req,res)=>{
    const _id=req.params.id;
    try {
        const user=await MyUser.findById(_id);
        if(!user){
            return res.status(404).send();
        }   
        res.send(user)
    } catch (error) {
        res.status(500).send();
    }
})
//update data
router.patch('/users/:id',async (req,res)=>{
    const keyFields = Object.keys(req.body);
    const allowUpdate = ['name','age','email','password'];
    const isValidOper = keyFields.every((value)=>allowUpdate.includes(value))
    
    if (!isValidOper) {
        return res.status(400).send({error:'invalid updates!'});
    }
    try {
        const user = await MyUser.findById(req.params.id);
        keyFields.forEach((upd)=>user[upd]=req.body[upd])
        await user.save();
        // const user = await MyUser.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        // findByIdAndUpdate is not used because it's bypass the middleware
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
})
//delete data
router.delete('/users/:id',async (req,res)=>{
    try {
        const user = await MyUser.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(404).send();
    }
})
module.exports=router;