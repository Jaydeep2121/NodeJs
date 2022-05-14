const Myrequest = require("../models/request_Model");

exports.addRequest = async (req, res) => {
  try {
    const brequ = new Myrequest(req.body);
    await brequ.save();
    res.status(201).send(brequ);
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
};
exports.Getreqdata = async (req, res) => {
  try {
    const brequ = await Myrequest.find().populate(
      "refuser",
      "email"
    );
    res.json(brequ);
  } catch (error) {
    console.log("e", error);
  }
};
