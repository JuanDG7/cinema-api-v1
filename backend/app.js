const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const moviesRoutes = require("./routes/movies");

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/movies", moviesRoutes);

app.use((error, req, res, next) => {
  console.log("Error desde el middleware global: ", error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect("mongodb+srv://jmdmg86:mongodb@cluster0.majzd.mongodb.net/movies")
  .then((result) => {
    app.listen(8000);
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!");
    console.log("Error: ", err);
  });
