const { validationResult } = require("express-validator");

const Movie = require("../models/movie");
// controllers/movies.js
//exports.getPosts
exports.getAllMovies = (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.status(200).json({
        message: "Películas obtenidas",
        movies: movies,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//exports.createPost
exports.createMovie = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
    //  return res.status(422).json({
    //   message: "Validation failed, entered data is incorrect.",
    //   errors: errors.array(),
    // });                       ESTA ES LA VERSION PARA APP CHICAS SIN MIDDLEWARE PARA ERRORES
  }
  const title = req.body.title;
  const content = req.body.content;
  const movie = new Movie({
    title: title,
    content: content,
    imageUrl: "images/bikini.jpg",
    creator: { name: "Max" },
  });
  movie
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Película creada",
        movie: result,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//exports.getPost
exports.getMovie = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        const error = new Error("No se encontró la película.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Película encontrada",
        movie: movie,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
