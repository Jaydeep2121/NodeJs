const Myapprvl = require("../models/apprvl_Model");

exports.addapprvl = async (req, res) => {
  try {
    const baprvl = new Myapprvl(req.body);
    await baprvl.save();
    res.status(201).send(baprvl);
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
};
//get appointment details
exports.getapprvl = async (req, res) => {
  try {
    const app = await Myapprvl.find().populate([{
        path:"refrequest",
        populate: { path: 'blood_group'}
    },{
        path:"refrequest",
        populate: { path: 'blood_compo'}
    }]).populate("refemp");
    res.json(app);
  } catch (error) {
    console.log("e", error);
  }
};
