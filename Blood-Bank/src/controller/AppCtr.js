const Myapp = require("../models/appoint_Model");
const MyUser = require("../models/user_Model");

//add appointment details
exports.Addapp = async (req, res) => {
  try {
    const appt = new Myapp({
      refcamp: req.body.refcamp,
      refuser: req.body.userfield,
    });
    await appt.save();
    res.status(201).send(appt);
  } catch (error) {
    res.status(400).send(error);
  }
};
//get appointment details
exports.Getapp = async (req, res) => {
  try {
    const app = await Myapp.find();
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
//to find the search data
exports.Getsearch = async (req, res) => {
  let x = req.params?.data;
  x = x.trim();
  try {
    const donordata = await Myapp.find({
      $or: [
        { name: { $regex: x, $options: "i" } },
        { email: { $regex: x, $options: "i" } },
        { gender: { $regex: x, $options: "i" } },
      ],
    }).populate("refuser");
    if (donordata.length === 0) {
      return res.status(404).json({ data: "Donor List is Empty" });
    }
    return res.json({ data: donordata });
  } catch (error) {
    console.log("e", error);
  }
};
//delete donorData
exports.deleteDonor = async (req, res) => {
  const delid = await Myapp.find({ refuser: req.params.id });
  try {
    Myapp.findByIdAndDelete(
      { _id: delid[0]._id.toString() },
      async (err, data) => {
        if (err) res.json(err);
        else {
          res.json({ success: "Donor Deleted Successfully" });
        }
      }
    );
  } catch (error) {
    console.log("e", error);
  }
};
