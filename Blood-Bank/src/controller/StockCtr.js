const Mystock = require("../models/stock_Model");

exports.Addstock = async (req, res) => {
  try {
    const stock = new Mystock(req.body);
    await stock.save();
    res.status(201).send(stock);
  } catch (error) {
    console.log("e", error);
    res.status(400).send(error);
  }
};
exports.Getstock = async (req, res) => {
  try {
    const stock = await Mystock.find().populate("blood_group", "group").populate("blood_compo","component");
    res.json(stock);
  } catch (error) {
    console.log("e", error);
  }
};
//to get stock details with ref data
exports.getStockRef = async (req, res) => {
  try {
    const data = await Mystock.findById(req.params.id).populate(
      "blood_compo",
      "component"
    );
    res.json(data);
  } catch (error) {
    console("err", error);
  }
};
// Get Stock Details By Stock ID
exports.editStock = async (req, res) => {
  Mystock.findById(req.params.id, function (err, usr) {
    if (err) return;
    res.json(usr);
  });
};
//delete userData
exports.deleteStock = async (req, res) => {
  try {
    Mystock.findByIdAndDelete({ _id: req.params.id }, async (err, data) => {
      if (err) res.json(err);
      else {
        res.json({ success: "Stock Removed Successfully" });
      }
    });
  } catch (error) {
    console.log("e", error);
  }
};
//function to update data
exports.UpdateStock = async (req, res) => {
  const keyFields = Object.keys(req.body);
  const allowUpdate = ["volume", "day_left", "blood_group", "blood_compo"];
  const isValidOper = keyFields.every((value) => allowUpdate.includes(value));
  if (!isValidOper) {
    return res.status(400).send({ error: "invalid updates!" });
  }
  try {
    const stock = await Mystock.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(stock);
  } catch (error) {
    console.log("e", error);
  }
};
//function to stock req qty update data
exports.UpdatereqStock = async (req, res) => {
  try {
    const stock = await Mystock.findByIdAndUpdate(req.params.id, {
      volume: req.body.quantity
    });
    res.send(stock);
  } catch (error) {
    console.log("e", error);
  }
};