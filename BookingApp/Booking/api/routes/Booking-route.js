const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Passenger = require("../models/Passenger-schema");
const { strict } = require("assert");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

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
route.post("/add/:flightId", (req, res, next) => {
  const flightID = req.params.flightId;
  Passenger.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "E-Mail ALready Exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const newPassenger = new Passenger({
              _id: mongoose.Types.ObjectId(),
              bookId:
                req.body.firstname.toUpperCase().slice(0, 3) +
                flightID +
                new Date().getSeconds(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              number: req.body.number,
              email: req.body.email,
              password: hash,
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
          }
        });
      }
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


//==================================


route.post("/login", (req, res, next) => {
  Passenger.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "AUth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth Succesful",
            token: token,
          });
        }
        res.status(401).json({
          message: "AUth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        eroor: err,
      });
    });
});


route.get("/get/status/:id", (req, res, next) => {
  const bID = req.params.id;
  Passenger.find({ bookId: bID })
    .exec()
    .then((result) => {
      if (result.length > 1) {
        res.status(409).json({
          message: "multiple ID exist in the database"
        })
      } else {
        Passenger.find({ flightID: result[0].flightID })
          .exec()
          .then((ress) => {
            res.status(200).json(ress);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})



//==================================
//delete passengers from certain flight

route.delete("/flight/passengers/:id", (req, res, next) => {

  const id = req.params.id;
  Passenger.find({ flightID: id })
    .exec()
    //.then((paas) => { paas.json() })
    .then((passArray) => {
      console.log(passArray);
      if (passArray == []) {
        res.status(200).json({
          message: "none",
          msg: "Passengers were'nt in the flight so none where deleted",
        })
      }
      else {
        passArray.forEach((pass) => {
          console.log(pass._id);
          Passenger.remove({ _id: pass._id })
            .exec()
        })
      }
    })
    .then((doc) => {
      console.log(doc);
      res.status(200).json({
        msg: "Succesfully deleted",
        message: "deleted"
        // count: doc.deletedCount
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
