const mongoose = require("mongoose");

const filmSchema = mongoose.Schema({
  name: String,
  desc: String,
  duration: String,
  directors: [String],
  stars: [String],
  rating: mongoose.Decimal128,
  release: String,
  image: String,
});

module.exports = mongoose.model("Film", filmSchema);
