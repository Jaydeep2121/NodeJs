const mongoose = require("mongoose");
const approval = new mongoose.Schema({
  refrequest: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Brequest",
  },
  refemp: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Emp",
  }
});
const apprv = mongoose.model("Approval", approval);
module.exports = apprv;
