const Mycamp = require("../models/camp_Model");

//add camp details
exports.Addcmp = async (req, res) => {
    const camp = new Mycamp(req.body);
    try {
      await camp.save();
      res.status(201).send(camp);
    } catch (error) {
      res.status(400).send(error);
    }
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