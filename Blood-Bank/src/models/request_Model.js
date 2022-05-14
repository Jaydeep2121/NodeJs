const mongoose = require("mongoose");
const requestM = new mongoose.Schema(
  {
    volume: {
      type: Number,
      required: true,
      trim: true,
    },
    refuser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    blood_group: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Bgroup",
    },
    blood_compo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "bcompo",
    },
  },
  { timestamps: true }
);
const Mrequest = mongoose.model("Brequest", requestM);
module.exports = Mrequest;
