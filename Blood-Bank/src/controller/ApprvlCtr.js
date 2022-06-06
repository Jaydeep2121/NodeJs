const Myapprvl = require("../models/apprvl_Model");
const MyDonrEl = require("../models/donor_elig_Model");

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
exports.adddonrEl = async (req, res) => {
  try {
    const donrEl = new MyDonrEl(req.body);
    await donrEl.save();
    res.status(201).send(donrEl);
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
