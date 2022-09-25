const asyncHandler = require("express-async-handler");
const Film = require("../models/filmsSchema");

// @desc   GET list of films
// @route GET /films
// @access Public

const getFilms = asyncHandler(async (req, res) => {
  const films = await Film.find();
  res.status(200).json(films);
});

module.exports = {
  getFilms,
};
