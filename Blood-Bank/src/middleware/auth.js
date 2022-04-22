const jwt = require('jsonwebtoken');
const Myuser = require('../models/users_Model');
const auth = async (req,res,next)=>{
    try {
        // const token = req.header('Authorization').replace('Bearer',' ')
        const token = req.headers.authorization.split(' ')[1]; //split from space and get 1st value
        const decoded = jwt.verify(token,'thisisdemo');
        //const usr = await Myuser.findOne({_id:decoded._id,'tokens.token':token});
        const usr = await Myuser.findOne({_id:decoded._id});
        // if (!usr) {
        //     throw new Error();
        // }
        req.token=token;
        req.User=usr;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({error:'Please authenticate'});
    }
}

module.exports=auth;