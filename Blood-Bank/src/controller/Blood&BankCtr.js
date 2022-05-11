const blgroup = require("../models/blood_group_Model");
const blcomp = require("../models/blood_component_Model");
const bbank = require("../models/bbank_Model");
const fs = require("fs");

//add bgroup
exports.AddBld = async (req, res) => {
  const grp = new blgroup(req.body);
  try {
    await grp.save();
    res.status(201).send(grp);
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
};
//add bcomp
exports.AddCmd = async (req, res) => {
  const grp = new blcomp(req.body);
  try {
    await grp.save();
    res.status(201).send(grp);
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
};
//add bankdata
exports.addBank = async (req, res) => {
  try {
    const bank = new bbank({
      ...req.body,
      imageUrl: req.files,
    });
    await bank.save();
    res.send(bank);
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
};
//for getting bank data
exports.getData = async (req, res) => {
  try {
    const bank = await bbank.find();
    res.json(bank);
  } catch (error) {
    console.log("e", error);
  }
};
//for updating bank data
exports.updateData = async (req, res) => {
  const pathdata = await bbank.find({});
  fs.unlink(pathdata[0].imageUrl[0]["path"], (err) => {
    if (err) return;
  });

  const keyFields = Object.keys(req.body);
  const allowUpdate = ["name", "mobile", "timing", "address"];
  const isValidOper = keyFields.every((value) => allowUpdate.includes(value));
  if (!isValidOper) {
    return res.status(400).send({ error: "invalid updates!" });
  }
  try {
    const bank = await bbank.findOneAndUpdate({
      ...req.body,
      imageUrl: req.files,
    });
    res.send(bank);
  } catch (error) {
    console.log("e", error);
  }
};
