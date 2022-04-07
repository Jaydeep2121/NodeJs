const express = require('express');
require('./db/mongoose');
const MyUser = require('./models/user');
const MyTask = require('./models/task');
const userRouter = require('./routers/user');

const app=express();
const port=process.env.PORT || 3000;

app.use(express.json()); //use app.use used to send the request in json format
app.use(userRouter);

//for save data
app.post('/users',async (req,res)=>{
    const user = new MyUser(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})
app.post('/tasks',async (req,res)=>{
    const task = new MyTask(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
})
//for getting data
app.get('/users',async (req,res)=>{
    try {
        const user = await MyUser.find({});
        res.send(user);
    } catch (error) {
        res.status(500).send(err);
    }
})
app.get('/users/:id',async (req,res)=>{
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
app.get('/tasks',async (req,res)=>{
    try {
        const task=await MyTask.find({})
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send();
    }
})
app.get('/tasks/:id',async (req,res)=>{
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
app.patch('/users/:id',async (req,res)=>{
    const keyFields = Object.keys(req.body);
    const allowUpdate = ['name','age','email','password'];
    const isValidOper = keyFields.every((value)=>allowUpdate.includes(value))
    
    if (!isValidOper) {
        return res.status(400).send({error:'invalid updates!'});
    }
    try {
        const user = await MyUser.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
})
app.patch('/tasks/:id',async (req,res)=>{
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
app.delete('/users/:id',async (req,res)=>{
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
app.delete('/tasks/:id',async (req,res)=>{
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
app.listen(port,()=>{
    console.log('server is up on port',port);
})