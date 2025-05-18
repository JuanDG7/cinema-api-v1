const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const moviesRoutes = require("./routes/movies");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/movies", moviesRoutes);

app.listen(8000);
