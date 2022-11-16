const asyncHandler = require("express-async-handler");
const Tickets = require("../models/bookingSchema");

// @desc   GET list of films
// @route GET /films
// @access Public

const getTickets = asyncHandler(async (req, res) => {
  const { film_name } = req.query;
  const data = await Tickets.findOne({ name: film_name });
  if (!data) {
    res.status(500);
    throw new Error("Error retrieving data.");
  } else {
    res.status(200).json(data);
  }
});

module.exports = {
  getTickets,
};
