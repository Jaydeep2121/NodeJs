const express = require('express');
const MyUser = require('../models/user_Model');
const multer  = require('multer');
const router = new express.Router();

var FileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../../NodeJS/Blood-Bank/public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpeg';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage:FileStorage});

//for save data
router.post('/users',upload.single('file'),async (req,res)=>{
    if(!req.file) {
        return res.status(500).send({ message: 'Upload fail'});
    } else {
        req.body.imageUrl = '../../public/images' + req.file.filename;
        MyUser.create(req.body, function (err, gallery) {
            if (err) {
                console.log('route error:',err);
                return next(err);
            }
            res.json(gallery);
        });
    }
})
//get data by id
router.get('/:id',async (req,res)=>{
  MyUser.findById(req.params.id,(err,gallery)=>{
    if(err)return next(err);
    res.json(gallery);
  })
})
module.exports=router