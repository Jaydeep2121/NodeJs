const express = require('express');
const router = new express.Router();

router.get('/test',(req,res)=>{
    res.send('from a new file');
})

module.exports=router;