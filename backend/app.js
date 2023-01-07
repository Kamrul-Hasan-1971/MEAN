const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts')

const app = express();

mongoose.connect('mongodb+srv://Hasan1971:730025@cluster0.2greaqi.mongodb.net/mean?retryWrites=true&w=majority')
  .then((response) => {
    //console.log("Connected to Database", response);
  })
  .catch((err) => {
    console.log("Error during connecting to Database", err);
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join("backend/images")))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,PUT, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use("/api/posts", postRoutes);

module.exports = app;
