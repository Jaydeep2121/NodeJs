const MyrequestApp = require("../models/reqApprv_Model");

exports.addRequestApp = async (req, res) => {
  try {
    const reqap = new MyrequestApp({
      req_data: req.params.id,
      status: req.body.data,
    });
    await reqap.save();
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
exports.getAllReqApp = async (req, res) => {
  try {
    const reqap = await MyrequestApp.find();
    res.json(reqap);
  } catch (error) {
    console.log("e", error);
  }
};
