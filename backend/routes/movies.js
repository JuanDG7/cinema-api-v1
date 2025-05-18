const express = require("express");

const moviesController = require("../controllers/movies");

const router = express.Router();

// GET //api//movies
router.get("/", moviesController.getAllMovies);

// POST //api//movies/createMovie
router.post("/createMovie", moviesController.createMovie);

module.exports = router;
