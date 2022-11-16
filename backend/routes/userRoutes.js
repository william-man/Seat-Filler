const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { protect } = require("../middleware/authMiddleware");

router.post("/register", urlencodedParser, jsonParser, registerUser);
router.post("/login", urlencodedParser, jsonParser, loginUser);
router.get("/profile", protect, getUser);

module.exports = router;
