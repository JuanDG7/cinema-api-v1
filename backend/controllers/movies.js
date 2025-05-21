const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

const Movie = require("../models/movie");
// controllers/movies.js
//exports.getPosts

exports.getAllMovies = (req, res, next) => {
  const currentPage = req.query.page || 1; //ACA SE PUEDE MEJORAR ALGO!!! SEGUN CHATGPT get the current page from query params, default to 1
  const perPage = 2; // number of movies per lastPage
  let totalItems; // total number of movies
  Movie.find()
    .countDocuments()
    .then((count) => {
      totalItems = count; // get the total number of movies
      return Movie.find()
        .sort({ createdAt: -1 }) // más nuevas primero
        .skip((currentPage - 1) * perPage) // skip the movies of previous pages
        .limit(perPage); // limit the number of movies to perPage
    })
    .then((movie) => {
      res.status(200).json({
        message: "Fetched movies successfully.",
        movies: movie,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }); // handle errors
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
  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path.replace(/\\/g, "/"); // replace backslash with forward slash for compatibility
  const title = req.body.title;
  const content = req.body.content;
  const movie = new Movie({
    title: title,
    content: content,
    imageUrl: imageUrl,
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

//exports.updatePost
exports.updateMovie = (req, res, next) => {
  const movieId = req.params.movieId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image; // this is the old image
  if (req.file) {
    imageUrl = req.file.path.replace(/\\/g, "/");
  }
  if (!imageUrl) {
    const error = new Error("No file picked.");
    error.statusCode = 422;
    throw error;
  }
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        const error = new Error("No se encontró la película.");
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== movie.imageUrl) {
        clearImage(movie.imageUrl);
      }
      movie.title = title;
      movie.content = content;
      movie.imageUrl = imageUrl;
      return movie.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Película actualizada",
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

exports.deleteMovie = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        const error = new Error("No se encontró la película.");
        error.statusCode = 404;
        throw error;
      }
      clearImage(movie.imageUrl);
      return Movie.findByIdAndDelete(movieId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Película eliminada",
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

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};
