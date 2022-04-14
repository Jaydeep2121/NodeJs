const express = require("express");
const MyPost = require("../models/post_Model");
const auth = require("../middleware/auth");
const router = new express.Router();

//create post
router.post('/post',auth,async (req,res)=>{
    const topic = new MyPost(req.body);
    try{
        await topic.save();
        res.send(topic);
    }catch(error){
        console.log('err',error);
        res.status(404).send(error);
    }
})
module.exports=router;