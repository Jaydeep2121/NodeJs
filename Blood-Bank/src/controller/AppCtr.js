const Myapp = require("../models/appoint_Model");

//add appointment details
exports.Addapp = async (req, res) => {
    const appt = new Myapp({
        refcamp:req.body.camp_id,
        refuser:req.body.user_id
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
      const app = await Myapp.find().select('refcamp -_id');;
      res.json(app);
    } catch (error) {
      console.log("e", error);
    }
};
