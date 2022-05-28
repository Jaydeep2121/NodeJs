const Myapp = require("../models/appoint_Model");

//add appointment details
exports.Addapp = async (req, res) => {
  const appt = new Myapp({
    refcamp: req.body.campfield,
    refuser: req.body.userfield
  });
  try {
    await appt.save();
    res.status(201).send(appt);
  } catch (error) {
    res.status(400).send(error);
  }
};
//get appointment details
exports.Getapp = async (req, res) => {
  try {
    const app = await Myapp.find().select("refcamp -_id");
    res.json(app);
  } catch (error) {
    console.log("e", error);
  }
};
exports.GetdonorApp = async (req, res) => {
  try {
    const app = await Myapp.find().populate("refuser");
    res.json(app);
  } catch (error) {
    console.log("e", error);
  }
};
exports.GetAppref = async (req, res) => {
  try {
    const app = await Myapp.findOne({ refuser: req.params.id })
      .populate("refcamp")
      .populate("refuser");
    res.json(app);
  } catch (error) {
    console("err", error);
  }
};
//delete donorData
exports.deleteDonor = async (req, res) => {
  const delid = await Myapp.find({refuser:req.params.id});
  try {
    Myapp.findByIdAndDelete({ _id: delid[0]._id.toString() }, async (err, data) => {
      if (err) res.json(err);
      else {
        res.json({ success: "Donor Deleted Successfully" });
      }
    });
  } catch (error) {
    console.log("e", error);
  }
};