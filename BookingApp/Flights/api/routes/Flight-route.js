const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Flight = require("../models/Flight-schema");

//getting data
route.get("/", (req, res, next) => {
  Flight.find()
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
});

route.post("/", (req, res, next) => {
  console.log("post is working");
  const flght = new Flight({
    _id: new mongoose.Types.ObjectId(),
    flightId:
      req.body.flightSource.toUpperCase().slice(0, 3) +
      req.body.flightDestination.toUpperCase().slice(0, 3) +
      Date.now(),
    flightSource: req.body.flightSource.toLowerCase(),
    flightDestination: req.body.flightDestination.toLowerCase(),
    flightArrival: req.body.flightArrival,
    flightDeparture: req.body.flightDeparture,
  });
  flght
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        flight: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

route.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Flight.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

route.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Flight.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

route.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Flight.remove({ _id: id })
    .exec()
    .then((doc) => {
      console.log("deleted succesfully");
      res.status(200).json({
        msg: "Succesfully deleted ",
        count: doc.deletedCount,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

route.get("/:source/:destination", (req, res, next) => {
  const source = req.params.source;
  const destination = req.params.destination;

  var query = {
    $and: [
      {
        flightSource: {
          $regex: source,
          $options: "I",
        },
      },
      {
        flightDestination: {
          $regex: destination,
          $options: "I",
        },
      },
    ],
  };

  Flight.find(query)
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
