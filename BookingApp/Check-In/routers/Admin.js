const express = require("express");
const route = express.Router();
const auth = require("../middleware/checkAuth");
const { default: Axios } = require("axios");

route.get("/getflights", (req, res, next) => {
  Axios.get("http://localhost:7001/flights/")
    .then((result) => {
      res.status(200).json(result.data);
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

route.post("/addflight", auth, (req, res, next) => {
  const flight = {
    flightSource: req.body.flightSource,
    flightDestination: req.body.flightDestination,
    flightArrival: req.body.flightArrival,
    flightDeparture: req.body.flightDeparture,
  };
  Axios.post("http://localhost:7001/flights/", flight)
    .then((result) => {
      console.log(result);
      res.send(result.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//returns all the passengers in the flight
route.get("/search/:flightNum", (req, res, next) => {
  const id = req.params.flightNum;
  Axios.get("http://localhost:7002/stats/flight/" + id)
    .then((result) => {
      console.log(result);
      res.send(result.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

route.patch("/update/:flightNum", auth, (req, res, next) => {
  const id = req.params.flightNum;
  Axios.get("http://localhost:7001/stats/flight/" + id)
    .then((result) => {
      console.log(result);
      res.send(result.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//route.delete();

module.exports = route;
