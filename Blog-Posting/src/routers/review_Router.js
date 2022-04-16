const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const MyPost = require("../models/post_Model");
const MyReview = require("../models/review_Model");
const router = new express.Router();

//create review of post
router.post('/review/:id',auth,async(req,res)=>{
    const postId = await MyPost.findOne({_id:req.params.id},'_id');
    if (!postId)return res.status(400).send({error:'Invalid Id!'});
    if(mongoose.connection.db.MyReview.count() === 0) {
        saveNewReview();
    }else{
        const userID = await MyReview.findOne({isLike:1}).distinct('user_owner');
    }
})
//get most liked post
router.get('/review/mostLiked',async(req,res)=>{
    try {
        const userID = await MyReview.find({isLike:1}).distinct('user_owner');
        const postId = await MyReview.find({user_owner:userID}).distinct('post_owner');
        const count = await MyReview.find({post_owner:postId[0]}).count();
        const post = await MyPost.find({_id:postId[0]}).populate('topic_owner');
        console.log('Total Likes : '+count);
        if (!post) {
            return res.status(404).send();
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send();
    }
})
//get like post
router.get('/review/like',async(req,res)=>{
    await LikeOrDisLikePost(req,res,'isLike')
});
//get dislike post
router.get('/review/dislike',async(req,res)=>{
    await LikeOrDisLikePost(req,res,'isDisLike')
});
//functions
const LikeOrDisLikePost = async (req,res,action) =>{
    try {
        const query = {};
        query[action] = 1;
        const review = await MyReview.find(query).populate('post_owner');
        if (!review)return res.status(404).send();
        console.log('Post '+action+' : '+review.length);
        res.status(200).send(review);
    } catch (error) {
        console.log('e',error);
        res.status(500).send();
    }
}
const saveNewReview = async(req,res) =>{
    const review = new MyReview({
        ...req.body,
        post_owner:postId._id,
        user_owner:req.User._id
    });
    try{
        await review.save();
        res.status(200).send(review);
    }catch(error){
        console.log('err',error);
        res.status(404).send(error);
    }
}
module.exports=router;