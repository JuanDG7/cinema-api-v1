const express = require("express");
const { body } = require("express-validator");

const moviesController = require("../controllers/movies");

const router = express.Router();

// GET //api//movies
router.get("/", moviesController.getAllMovies);

// POST //api//movies/createMovie
router.post(
  "/createMovie",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("El título debe tener al menos 5 caracteres."),
    body("content")
      .trim()
      .isLength({ min: 5 })
      .withMessage("El contenido debe tener al menos 5 caracteres."),
  ],
  moviesController.createMovie
);

router.get("/:movieId", moviesController.getMovie);
module.exports = router;
