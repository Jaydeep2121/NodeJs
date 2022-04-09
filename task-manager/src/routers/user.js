const express = require('express');
const auth = require('../middleware/auth');
const MyUser = require('../models/user');
const router = new express.Router();

//for save data
router.post('/users',async (req,res)=>{
    const user = new MyUser(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch (error) {
        res.status(400).send(error);
    }
})
//for login credentials
router.post('/users/login',async (req,res)=>{
    try {
        const user = await MyUser.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        // res.send({user:user.getPublicData(),token})
        res.send({user,token}) //user implicit call toJSON
    } catch (error) {
        res.status(400).send(error)
    }
})
//for logout single
router.get('/users/logout',auth, async (req,res)=>{
    try {
        req.User.tokens = req.User.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.User.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})
//for logout from all
router.post('/users/logoutAll',auth,async (req,res)=>{
    try {
        req.User.tokens=[]
        await req.User.save()
        res.send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
//for getting data
router.get('/users/me',auth,async (req,res)=>{
    res.send(req.User)
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
router.patch('/users/me',auth,async (req,res)=>{
    const keyFields = Object.keys(req.body);
    const allowUpdate = ['name','age','email','password'];
    const isValidOper = keyFields.every((value)=>allowUpdate.includes(value))
    
    if (!isValidOper) {
        return res.status(400).send({error:'invalid updates!'});
    }
    try {
        // const user = await MyUser.findById(req.params.id);
        keyFields.forEach((upd)=>req.User[upd]=req.body[upd])
        await req.User.save();
        // const user = await MyUser.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        // findByIdAndUpdate is not used because it's bypass the middleware
        res.send(req.User);
    } catch (error) {
        console.log('e',error)
        res.status(500).send();
    }
})
//delete data
router.delete('/users/me',auth,async (req,res)=>{
    try {
        await req.User.remove()
        res.send(req.User);
    } catch (error) {
        res.status(404).send();
    }
})
module.exports=router;