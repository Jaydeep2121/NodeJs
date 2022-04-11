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
//GET /tasks?completed=true
//GET //tasks?limit=2&skip=0 ->first page and get 2 result
//GET //task?sortBy=createdAt:desc
router.get('/tasks',auth,async (req,res)=>{
    try {
        const match={}
        const sort={}
        if(req.query.completed){
            match.completed = req.query.completed==='true'
        }
        if(req.query.sortBy){
            const part = req.query.sortBy.split(':')
            sort[part[0]]=part[1]==='desc'?-1:1 
        }
        // const task=await MyTask.find({owner:req.User._id})
        // res.status(201).send(task)
        await req.User.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(201).send(req.User.tasks)
    } catch (error) {
        console.log(error)
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
router.patch('/tasks/:id',auth,async (req,res)=>{
    const keyFields = Object.keys(req.body);
    const allowUpdate = ['description','completed'];
    const isValidOper = keyFields.every((value)=>allowUpdate.includes(value))
    
    if (!isValidOper) {
        return res.status(400).send({error:'invalid updates!'});
    }
    try {
        const task = await MyTask.findOne({_id:req.params.id,owner:req.User._id});
        if(!task){
            return res.status(404).send();
        }
        keyFields.forEach(upd=>task[upd]=req.body[upd])
        await task.save();
        // const task = await MyTask.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        // findByIdAndUpdate is not used because it's bypass the middleware
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
})
//delete data
router.delete('/tasks/:id',auth,async (req,res)=>{
    try {
        const task = await MyTask.findByIdAndDelete({_id:req.params.id,owner:req.User._id});
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        console.log(error);
        res.status(404).send();
    }
})

module.exports=router