const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Passenger = require("../models/Passenger-schema");
const { strict } = require("assert");

//returns all the passengers in the database
route.get("/", (req, res, next) => {
  Passenger.find()
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        count: result.length,
        passengers: result.map((doc) => {
          return {
            _id: doc._id,
            flightId: doc.flightId,
            firstname: doc.firstname,
            lastname: doc.lastname,
            number: doc.number,
            dob: doc.dob,
            nationality: doc.nationality,
            flight: doc.flightId,
            status: doc.status,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Books a certain flight whose id is passed through parameters
route.post("/:flightId", (req, res, next) => {
  const flightID = req.params.flightId;
  const newPassenger = new Passenger({
    _id: mongoose.Types.ObjectId(),
    bookId:
      req.body.firstname.toUpperCase().slice(0, 3) +
      flightID +
      new Date().getSeconds(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    number: req.body.number,
    // dob: req.body.dob,
    Nationality: req.body.Nationality,
    flightID: flightID,
    status: req.body.status,
  });
  newPassenger
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Searches for a certain passenger id in the whole database
route.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Passenger.findById(id)
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(result);
    });
});

//updates a certain attribute of passenger
//it takes paramter as propname and value, propname is property to be updated
//value is the new value which will be updated
route.patch("/:Id", (req, res, next) => {
  const id = req.params.Id;
  //object which will be setted instead of old attribute
  const updateOps = {};
  //for loop used to make changes in only certain attributes of the object only
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Passenger.update({ _id: id }, { $set: updateOps })
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

//deletes a certain id of passenger
route.delete("/:Id", (req, res, next) => {
  const id = req.params.Id;
  Passenger.remove({ _id: id })
    .exec()
    .then((doc) => {
      console.log(doc);
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

module.exports = route;
