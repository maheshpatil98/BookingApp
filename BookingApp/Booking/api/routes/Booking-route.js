const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Passenger = require("../models/Passenger-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            flightID: doc.flightID,
            useridentification: doc.useridentification,
            firstname: doc.firstname,
            lastname: doc.lastname,
            number: doc.number,
            email: doc.email,
            Nationality: doc.Nationality,
            bookId: doc.bookId,
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

//books a flight
route.post("/book/:id/:amt/:uid", (req, res, next) => {
  const nid = req.params.id;
  const amount = req.params.amt;
  const uId = req.params.uid;

  const newPassenger = new Passenger({
    _id: mongoose.Types.ObjectId(),
    bookId:
      req.body.firstname.toUpperCase().slice(0, 3) +
      nid +
      new Date().getSeconds(),
    useridentification: uId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    number: req.body.number,
    email: req.body.email,
    amount: amount,
    password: req.body.password,
    Nationality: req.body.Nationality,
    flightID: nid,
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
})


//Registers new certain flight whose id is passed through parameters
route.post("/add/:flightId/:amt", (req, res, next) => {
  const flightID = req.params.flightId;
  const amount = req.params.amt;
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
              useridentification: req.body.firstname.toLowerCase().slice(0, 3) + req.body.lastname.toLowerCase().slice(0, 3) + new Date().getSeconds(),
              number: req.body.number,
              email: req.body.email,
              password: hash,
              amount: amount,
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
  Passenger.findById({ useridentification: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
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
  Passenger.update({ bookId: id }, { $set: updateOps })
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
route.delete("/:userid", (req, res, next) => {
  const id = req.params.userid;
  Passenger.remove({ useridentification: id })
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({
        message: "Succesfully deleted ",
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


//removes particular flight booking and not the user
route.delete("/book/:bookId", (req, res, next) => {
  const id = req.params.bookId;
  Passenger.remove({ bookId: id })
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({
        message: "Succesfully deleted ",
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
            id: user[0].useridentification
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



//gets all the flight registered on certain user ID
route.get("/get/status/:id", (req, res, next) => {
  const bID = req.params.id;
  Passenger.find({ useridentification: bID })
    .exec()
    .then((result) => {
      res.status(200).json(result);
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
