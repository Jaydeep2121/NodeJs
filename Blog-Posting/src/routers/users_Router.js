const express = require("express");
const MyUser = require("../models/users_Model");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new MyUser(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
});
module.exports = router;
