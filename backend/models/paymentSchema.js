const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    card: {
      type: String,
      required: [true, "Please enter your card number."],
    },
    basket: {
      type: Array,
      required: [true, " Your basket is empty"],
    },
    total: {
      type: mongoose.Decimal128,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
