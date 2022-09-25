const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");

const bodyParser = require("body-parser");
const { protect } = require("../middleware/authMiddleware");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.post("/register", urlencodedParser, registerUser);
router.post("/login", urlencodedParser, loginUser);
router.get("/profile", protect, getUser);

module.exports = router;
