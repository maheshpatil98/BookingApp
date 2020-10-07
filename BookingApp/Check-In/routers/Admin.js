const express = require("express");
const route = express.Router();
const auth = require("../middleware/checkAuth");
const Axios = require("axios");

route.get("/getflights", (req, res, next) => {
  Axios.get("http://localhost:7001/flights/")
    .then((result) => {
      res.status(200).json(result.data);
      //console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

route.post("/addflight", (req, res, next) => {

  const flight = {
    flightSource: req.body.flightSource,
    flightDestination: req.body.flightDestination,
    flightArrival: req.body.flightArrival,
    flightDeparture: req.body.flightDeparture,
    amount: req.body.amount,
    flightStatus: req.body.flightStatus
  };
  console.log("check-in is working " + flight);
  Axios.post("http://localhost:7001/flights/", flight)
    .then((result) => {
      console.log(result.data);
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
route.get("/search/:flightNum", auth, (req, res, next) => {
  const id = req.params.flightNum;
  Axios.get("http://localhost:7001/flights/" + id)
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
  Axios.get("http://localhost:7001/flights/" + id)
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
  const Post = [{
    propName: req.body.propName,
    value: req.body.value
  }]
  fetch("http://localhost:7001/flights/" + id, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Post),
  })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Updated"
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});



route.delete("/:id", auth, (req, res, next) => {
  const fid = req.params.id;
  Axios.delete("http://localhost:7002/bookings/flight/passengers/" + req.params.id)
    .then((ress) => {
      console.log("request executed succesfully");
      if (ress.data.message == "deleted" || ress.data.message == "none") {

        console.log("Passengers deleted and condition satisfied");
        Axios.delete("http://localhost:7001/flights/" + fid)

          .then((remms) => {
            if (remms.data.message == "deleted") {
              console.log("All condition satisfied and succesfully deleted");
              res.status(200).json({
                message: "Passengers and Flight details sucesfully deleted"
              })
            }
          })
          .catch((err) => {
            res.status(500).json({
              error: err
            })
          })

      }
    })
    .catch(err => console.log(err))

});




route.delete("/pass/delete/:userid", auth, (req, res, next) => {
  const id = req.params.userid;
  Axios.delete("http://localhost:7002/bookings/" + id)
    .then((remms) => {
      console.log("All condition satisfied and succesfully deleted");
      res.status(200).json({
        message: "Passenger sucesfully deleted"
      }
      )
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
});

module.exports = route;
