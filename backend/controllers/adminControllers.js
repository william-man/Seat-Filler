const asyncHandler = require("express-async-handler");
const Film = require("../models/filmsSchema");
const User = require("../models/userSchema");
const userSchema = require("../models/userSchema");

// @desc    GET list of films
// @route   GET /admin
// @access  public

const getAdminFilms = asyncHandler(async (req, res) => {
  const adminCheck = req.header("isAdmin");
  if (!adminCheck) {
    res.status(401);
    throw new Error("Not authorized access.");
  } else {
    const films = await Film.find();
    res.json(films);
  }
});

// @desc    DELETE film :id
// @route   DELETE /admin/:id
// @access  private

const deleteAdminFilms = asyncHandler( async(req, res) => {
  const adminCheck = req.header("isAdmin");
  if (!adminCheck) {
    throw new Error("Not authorized access.");
  }

  const selectedFilm = await Film.findById(req.body._id)
  if(!selectedFilm){
    res.status(404);
    throw new Error("Film not found");
  }
  const removed = await selectedFilm.remove();
  if(removed) {
    res.status(200).json({message: "Film deleted"})
  } else{
    throw new Error("Error deleting film.")
  }
});

// @desc    PUT update film of :id
// @route   PUT /admin/:id
// @access  private

const putAdminFilms = asyncHandler(async (req, res) => {
  const adminCheck = req.header("isAdmin");
  if (!adminCheck) {
    res.status(401);
    throw new Error("Not authorized access.");
  }
  const edits = req.body;
  // check film with _id exists.
  const selectedFilm = await Film.findById(edits._id);
  if (!selectedFilm) {
    res.status(404);
    throw new Error("Film not found");
  } else {
    // if film exists loop through properties in edits to update selectedFilm
    for (let prop in edits) {
      if (prop) {
        selectedFilm[prop] = edits[prop];
      }
    }
  }
  // save to database and return updated film
  const update = await selectedFilm.save();
  if (update) {
    res.status(200).json(update);
  }
});

// @desc    POST add new film :id
// @route   POST /admin/:id
// @access  private

const postAdminFilms = asyncHandler(async (req, res) => {
  const adminCheck = req.header("isAdmin");
  if (!adminCheck) {
    res.status(401);
    throw new Error("Not authorized access.");
  } else {
    const { name, desc, duration, directors, stars, rating, release, image } =
      req.body;
    if (!name || !desc || !duration) {
      throw new Error("Please complete: name, desc, duration fields. ");
    }
    //check if film exists
    const filmExists = await Film.findOne({ name });

    if (filmExists) {
      res.status(400);
      throw new Error("Film already exists.");
    }

    //create film
    const newFilm = Film.create({
      name,
      desc,
      duration,
      directors,
      stars,
      rating,
      release,
      image,
    });

    if (newFilm) {
      res.status(201).json({ message: "new film added" });
    } else {
      res.status(400);
      throw new Error("Invalid film data.");
    }
  }
});

module.exports = {
  getAdminFilms,
  deleteAdminFilms,
  putAdminFilms,
  postAdminFilms,
};
