const express = require("express");
const router = express.Router();
const {
  getAdminFilms,
  deleteAdminFilms,
  putAdminFilms,
  postAdminFilms,
} = require("../controllers/adminControllers");

router.route("/").get(getAdminFilms);

router
  .route("/")
  .delete(deleteAdminFilms)
  .put(putAdminFilms)
  .post(postAdminFilms);

module.exports = router;
