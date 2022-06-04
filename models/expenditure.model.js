const mongoose = require("mongoose");

const expenditureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: false },
    price: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Expenditure = mongoose.model("expenditure", expenditureSchema);

module.exports = Expenditure;
