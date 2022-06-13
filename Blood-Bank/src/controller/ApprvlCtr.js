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
exports.updateDonrEl = async (req, res) => {
  try {
    const donorel = await MyDonrEl.findOneAndUpdate(
      { refuser: req.params.id },
      {
        last_donate: req.body.last_donate,
        status: "verify",
        // status: "pending",
      }
    );
    res.send(donorel);
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
};
exports.adddonrEl = async (req, res) => {
  var [dyear, dmonth, dday] = req.body.dob.split("-");
  try {
    const donrEl = new MyDonrEl({
      dob: new Date(+dyear, dmonth - 1, +dday + 1),
      weight: req.body.weight,
      hemog: req.body.hemog,
      refuser: req.params.id,
    });
    await donrEl.save();
    res.status(201).send(donrEl);
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
};
//get donor spec record
exports.getDonrEl = async (req, res) => {
  try {
    const donrEl = await MyDonrEl.findOne(
      { refuser: req.params.id }
    );
    res.send(donrEl);
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
};
//get appointment details
exports.getapprvl = async (req, res) => {
  try {
    const app = await Myapprvl.find()
      .populate([
        {
          path: "refrequest",
          populate: { path: "blood_group" },
        },
        {
          path: "refrequest",
          populate: { path: "blood_compo" },
        },
      ])
      .populate("refemp");
    res.json(app);
  } catch (error) {
    console.log("e", error);
  }
};
