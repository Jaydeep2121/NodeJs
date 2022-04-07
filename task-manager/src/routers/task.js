const express = require('express');
const MyTask = require('../models/task');
const router = new express.Router();

//for save data
router.post('/tasks',async (req,res)=>{
    const task = new MyTask(req.body);
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
router.get('/tasks/:id',async (req,res)=>{
    const _id=req.params.id;
    try {
        const task=await MyTask.findById(_id)
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
        const task = await MyTask.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
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