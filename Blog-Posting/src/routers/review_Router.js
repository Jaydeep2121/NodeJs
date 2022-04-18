const express = require("express");
const auth = require("../middleware/auth");
const MyPost = require("../models/post_Model");
const MyReview = require("../models/review_Model");
const router = new express.Router();

//create review of post
router.post('/review/:id',auth,async(req,res)=>{
    const postId = await MyPost.findOne({_id:req.params.id},'_id');
    if (!postId)return res.status(400).send({error:'Invalid Id!'});
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
})
//update review of post
router.patch('/review/me/:id',auth,async (req,res)=>{
    const keyFields = Object.keys(req.body);
    const allowUpdate = ['isLike','isDisLike'];
    const isValid = keyFields.every((val)=>allowUpdate.includes(val));
    const review=await MyReview.findOne({post_owner:req.params.id,user_owner:req.User._id})
    if (!review) {
        return res.status(400).send({error:'Invalid Id!'});
    }
    if (!isValid) {
        return res.status(400).send({error:'invalid updates!'});
    }
    try{
        keyFields.forEach((upd)=>{
            review[upd]=req.body[upd];
            (upd==='isLike')?review['isDisLike']=0:review['isLike']=0;
        });
        await review.save();
        res.status(200).send(review);
    }catch(error){
        console.log('e',error)
        res.status(500).send();
    }
})
//get most liked post
router.get('/review/mostLiked',async(req,res)=>{
    try {
        const data=await MyReview.aggregate([{
            '$group': {
                '_id': {'post_owner': '$post_owner',
                        'user_owner':await MyReview.find(
                                    {
                                        isLike:1,isDisLike:0
                                    }).distinct('user_owner')},
              'count': {'$sum': 1},  
              'post_owner':{'$last': '$post_owner'}
            }
          },{
              '$sort' : {'count' : -1}
            },
            { '$limit' : 1 },
            {
                '$match': {
                    'count': {'$gt': 1}
                }
            }])
        object = Object.assign({}, ...data);
        const post = await MyPost.find({_id:object.post_owner}).populate('topic_owner');
        console.log('Total Likes : '+object.count);
        if (!post) {
            return res.status(404).send();
        }
        res.status(200).send(post);
    } catch (error) {
        console.log('e',error);
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
module.exports=router;