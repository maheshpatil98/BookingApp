const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const flightRoute = require("./api/routes/Flight-route");
const Murgan = require("morgan");

mongoose.connect(
  process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/flights", flightRoute);

module.exports = app;
