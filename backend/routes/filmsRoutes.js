const express = require("express");
const router = express.Router();
const { getFilms } = require("../controllers/filmsController");

router.get("/", getFilms);

module.exports = router;
