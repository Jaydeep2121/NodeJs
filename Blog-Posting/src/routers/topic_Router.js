const express = require("express");
const MyTopic = require("../models/topic_Model");
const auth = require("../middleware/auth");
const router = new express.Router();

//create topic
router.post('/topic',auth,async (req,res)=>{
    const topic = new MyTopic({
        ...req.body,
        user_owner:req.User._id   
    });
    try{
        await topic.save();
        res.send(topic)
    }catch(error){
        console.log('err',error);
        res.status(404).send(error);
    }
})
//get topic by id
router.get('/topics/:id',auth,async (req,res)=>{
    const _id=req.params.id;
    try {
        const topic=await MyTopic.findOne({_id,user_owner:req.User._id})
        if (!topic) {
            return res.status(404).send();
        }
        res.send(topic);
    } catch (error) {
        res.status(500).send();
    }
})
//get all topics
router.get('/topics',auth,async (req,res)=>{
    try {
        const topic=await MyTopic.find({user_owner:req.User._id})
        if (!topic) {
            return res.status(404).send();
        }
        res.send(topic);
    } catch (error) {
        res.status(500).send();
    }
})
module.exports = router;