const express = require("express");
const MyPost = require("../models/post_Model");
const MyTopic = require("../models/topic_Model");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const router = new express.Router();

//create post
router.post('/post/:id',auth,async (req,res)=>{
    const topic_id = await MyTopic.findOne({_id:req.params.id,user_owner:req.User._id},'_id');
    if (!topic_id) {
        return res.status(400).send({error:'Invalid Id!'});
    }
    const post = new MyPost({
        ...req.body,
        topic_owner:topic_id._id,
        user_owner:req.User._id
    });
    try{
        await post.save();
        res.status(200).send(post);
    }catch(error){
        console.log('err',error);
        res.status(404).send(error);
    }
})
//edit post
router.patch('/post/me/:id',auth,async (req,res)=>{
    const keyFields = Object.keys(req.body);
    const allowUpdate = ['postBody','PostComment'];
    const isValid = keyFields.every((val)=>allowUpdate.includes(val));
    const post=await MyPost.findOne({_id:req.params.id,user_owner:req.User._id})
    if (!post) {
        return res.status(400).send({error:'Invalid Id!'});
    }
    if (!isValid) {
        return res.status(400).send({error:'invalid updates!'});
    }
    try{
        keyFields.forEach((upd)=>post[upd]=req.body[upd]);
        await post.save();
        res.status(200).send(post);
    }catch(error){
        console.log('e',error)
        res.status(500).send();
    }
})
//delete data
router.delete('/post/me/:id',auth,async (req,res)=>{
    try {
        const post=await MyPost.findOne({_id:req.params.id,user_owner:req.User._id})
        await post.remove()
        res.status(200).send(post);
    } catch (error) {
        res.status(404).send();
    }
})
//get post by id
router.get('/post/:id',auth,async (req,res)=>{
    const _id=req.params.id;
    try {
        const post=await MyPost.findById({_id,user_owner:req.User._id})
        if (!post) {
            return res.status(404).send();
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send();
    }
})
//get all posts
router.get('/posts',auth,async (req,res)=>{
    try {
        const post=await MyPost.find({user_owner:req.User._id})
        if (!post) {
            return res.status(404).send();
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send();
    }
})
//GET /posts?topic=business
//get post by topic
router.get('/postes/:id',auth,async (req,res)=>{
    try {
        // let topic=''
        // if (req.query.topic.toLowerCase()==='business') {
        //     topic = 'Business';
        // }
        // if(topic===null || topic==='')return;
        // const topicid = await MyTopic.findOne({title:topic},'_id');
        const data=await MyPost.find({topic_owner:req.params.id});
        // await data.populate('topic_owner');
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})
//get most recent post
router.get('/last_post',auth,async (req,res)=>{
    try {
        res.status(200).send(await MyPost.find({}).sort({_id:-1}).limit(1));
    } catch (error) {
        res.status(500).send();
    }
})
module.exports=router;