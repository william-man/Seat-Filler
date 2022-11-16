const express = require("express");
const router = express.Router();
const { getTickets } = require("../controllers/bookingControllers");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", urlencodedParser, jsonParser, getTickets);

module.exports = router;
