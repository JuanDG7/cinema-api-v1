const express = require("express");
const { body } = require("express-validator");

const moviesController = require("../controllers/movies");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET //api//movies
router.get("/", moviesController.getAllMovies);

// POST //api//movies/createMovie
router.post(
  "/createMovie",
  isAuth,
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

// GET //api//movies/:movieId
router.get("/:movieId", moviesController.getMovie);

// PUT // posts/:postId
// PUT //api//movies/:movieId
router.put(
  "/:movieId",
  isAuth,
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
  moviesController.updateMovie
);

router.delete("/:movieId", isAuth, moviesController.deleteMovie);

module.exports = router;
