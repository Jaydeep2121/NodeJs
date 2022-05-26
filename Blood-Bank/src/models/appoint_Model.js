const mongoose = require("mongoose");
const appmodel = new mongoose.Schema({
  refuser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  refcamp: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Camp",
  }
});
const appoit = mongoose.model("Appoint", appmodel);
module.exports = appoit;
