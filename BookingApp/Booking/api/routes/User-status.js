const express = require("express");
const route = express.Router();
const Passenger = require("../models/Passenger-schema");

//get status of the bookedID means it returns result for passenger
route.get("/:bookId", (req, res, next) => {
  pid = req.params.bookId;

  var query = { bookId: { $regex: pid } };

  Passenger.find(query)
    .select("bookId firstname lastname flightID status")
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// total passengers in the flight with flight status
route.get("/flight/:flightId", (req, res, next) => {
  const fid = req.params.flightId;

  var query = { flightID: { $regex: fid } };

  Passenger.find(query)
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = route;
