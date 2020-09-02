const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const bookRoute = require("./api/routes/Booking-route");
const statusRoute = require("./api/routes/User-status");

mongoose.connect(
  process.env.MONGODB_URL,
  () => {
    console.log("Connected to database succesfully..");
  }
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

app.use("/stats", statusRoute);
app.use("/bookings", bookRoute);

module.exports = app;
