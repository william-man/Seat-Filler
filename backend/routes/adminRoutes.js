const express = require("express");
const router = express.Router();
const {
  getAdminFilms,
  deleteAdminFilms,
  putAdminFilms,
  postAdminFilms,
} = require("../controllers/adminControllers");
const { protect } = require("../middleware/authMiddleware");
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get("/read", protect, getAdminFilms);
router.delete("/delete", urlencodedParser, protect, deleteAdminFilms);
router.put("/update", protect, urlencodedParser, putAdminFilms);
router.post("/create", protect, urlencodedParser, postAdminFilms);

module.exports = router;
