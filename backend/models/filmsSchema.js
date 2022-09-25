const mongoose = require("mongoose");

const filmSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  desc: {
    type: String,
    required: [true, "Please add a description"],
  },
  duration: {
    type: String,
    required: [true, "Please add duration"],
  },
  directors: { type: Array },
  stars: { type: Array },
  rating: { type: mongoose.Decimal128 },
  release: { type: String },
  image: { type: String },
});
module.exports = mongoose.model("Film", filmSchema);
