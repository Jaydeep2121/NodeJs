const express = require('express');
const MyTask = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

//for save data
router.post('/tasks',auth,async (req,res)=>{
    // const task = new MyTask(req.body);
    const task = new MyTask({
        ...req.body,
        owner:req.User._id
    })
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
})
//for getting data
router.get('/tasks',async (req,res)=>{
    try {
        const task=await MyTask.find({})
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send();
    }
})
router.get('/tasks/:id',auth,async (req,res)=>{
    const _id=req.params.id;
    try {
        const task=await MyTask.findOne({_id,owner:req.User._id})
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
})
//update data
router.patch('/tasks/:id',async (req,res)=>{
    const keyFields = Object.keys(req.body);
    const allowUpdate = ['description','completed'];
    const isValidOper = keyFields.every((value)=>allowUpdate.includes(value))
    
    if (!isValidOper) {
        return res.status(400).send({error:'invalid updates!'});
    }
    try {
        const task = await MyTask.findById(req.params.id);  
        keyFields.forEach(upd=>task[upd]=req.body[upd])
        await task.save();
        // const task = await MyTask.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        // findByIdAndUpdate is not used because it's bypass the middleware
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
})
//delete data
router.delete('/tasks/:id',async (req,res)=>{
    try {
        const task = await MyTask.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(404).send();
    }
})

module.exports=router