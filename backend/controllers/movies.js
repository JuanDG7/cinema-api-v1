// controllers/movies.js
exports.getAllMovies = (req, res, next) => {
  res.json({
    _id: "1",
    message: "Lista de todas las películas",
    imageUrl: "images/bikini.jpg",
    createdAt: new Date(),
  });
};

exports.createMovie = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "Película creada",
    movie: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: "Max",
      },
      createdAt: new Date(),
    },
  });
};
