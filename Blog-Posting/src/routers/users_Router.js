const express = require("express");
const MyUser = require("../models/users_Model");
const router = new express.Router();

//register user
router.post("/users", async (req, res) => {
  const user = new MyUser(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user,token})
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
});
//login user
router.post('/users/login',async (req,res)=>{
  try {
      const user = await MyUser.findByCredentials(req.body.email,req.body.password)
      const token = await user.generateAuthToken()
      // if (user.tokens.length !== 0) {
      //     user.tokens=[];
      //     await user.save();//remove token when no need
      // }
      res.status(201).send({user,token})
  } catch (error) {
      res.status(400).send(error)
  }
})
module.exports = router;
