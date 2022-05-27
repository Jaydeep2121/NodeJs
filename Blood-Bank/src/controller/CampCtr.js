const Mycamp = require("../models/camp_Model");

//add camp details
exports.Addcmp = async (req, res) => {
    const camp = new Mycamp(req.body);
    try {
      await camp.save();
      res.status(201).send(camp);
    } catch (error) {
      console.log('e',error);
      res.status(400).send(error);
    }
};
//function to update data
exports.UpdateCamp = async (req, res) => {
  const keyFields = Object.keys(req.body);
  const allowUpdate = [
    "date",
    "time",
    "camp_name",
    "address",
    "conducted_by",
    "organized_by",
  ];
  const isValidOper = keyFields.every((value) => allowUpdate.includes(value));
  if (!isValidOper) {
    return res.status(400).send({ error: "invalid updates!" });
  }
  try {
    const camp = await Mycamp.findByIdAndUpdate(req.params.id,req.body,{ new: true });
    res.send(camp);
  } catch (error) {
    console.log("e", error);
  }
};
// Get User Details By User ID
exports.editCamp = async (req, res) => {
  Mycamp.findById(req.params.id, function (err, usr) {
    if (err) return;
    res.json(usr);
  });
};
//get camp details
exports.Getcamp = async (req, res) => {
    try {
      const camp = await Mycamp.find();
      res.json(camp);
    } catch (error) {
      console.log("e", error);
    }
};
//delete userData
exports.deleteCamp = async (req, res) => {
  try {
    Mycamp.findByIdAndDelete({ _id: req.params.id }, async (err, data) => {
      if (err) res.json(err);
      else {
        res.json({ success: "Camp Deleted Successfully" });
      }
    });
  } catch (error) {
    console.log("e", error);
  }
};