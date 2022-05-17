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
exports.UpdRequest = async (req, res) => {
  try {
    const reqap = await Myrequest.findByIdAndUpdate(req.params.id, {
      status: req.body.data
    }, { new: true });
    res.status(201).send(reqap);
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
};

exports.Getreqdata = async (req, res) => {
  try {
    const brequ = await Myrequest.find()
      .populate("refuser", "email")
      .populate("blood_group", "group")
      .populate("blood_compo", "component");
    res.json(brequ);
  } catch (error) {
    console.log("e", error);
  }
};
//to get stock details with ref data
exports.Getreqapdata = async (req, res) => {
  try {
    const data = await Myrequest.findById(req.params.id).populate("blood_compo","component").
    populate("blood_group", "group");
    res.json(data);
  } catch (error) {
    console("err", error);
  }
};