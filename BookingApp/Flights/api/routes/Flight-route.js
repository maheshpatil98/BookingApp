const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Flight = require("../models/Flight-schema");

//getting data
route.get("/", (req, res, next) => {
  console.log("req andar ghusi hai");
  Flight.find()
    .exec()
    .then((result) => {
      console.log("data retriive kiya hai");
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
});

route.get("/sort/:criteria/:ord", (req, res, next) => {
  const crit = req.params.criteria;
  const ord = req.params.ord;
  console.log("req andar ghusi hai");
  Flight.find().sort([[crit, ord]])
    .exec()
    .then((result) => {
      console.log("data retriive kiya hai");
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
});


route.get("/sort/:criteria/:criteria2/:ord/:ord2", (req, res, next) => {
  const crit = req.params.criteria;
  const crit2 = req.params.criteria2;
  const ord = req.params.ord;
  const ord2 = req.params.ord2;
  console.log("req working");
  Flight.find().sort([[crit, ord], [crit2, ord2]])
    .exec()
    .then((result) => {
      console.log("data retriive kiya hai");
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
  Flight.find({ flightId: id })
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
  Flight.update({ flightId: id }, { $set: updateOps })
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
  Flight.remove({ flightId: id })
    .exec()
    .then((doc) => {
      console.log("deleted succesfully");
      res.status(200).json({
        message: "deleted",
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

//sort

// route.get("/sort", (req, res, next) => {
//   console.log("eeeeeeeeeeeeee");
//   Flight.find()
//     .exec()
//     .then((result) => {
//       console.log("data retriive kiya hai");
//       res.status(200).json(result);
//     })
//     .catch((err) => console.log(err));
// });




module.exports = route;
