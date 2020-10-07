const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

//Sign up for user
/**
 * @swagger
 * /users/signup/:
 *    post:
 *      description: Use to post new User in the database
 *      parameters:
 *              - name: reqBody
 *                description: request body
 *                in: body
 *                schema:
 *                    type: object
 *                    properties:
 *                       firstName:
 *                          type: String
 *                       lastName:
 *                          type: String
 *                       email:
 *                          type: String
 *                       password:
 *                          type: String
 *      responses:
 *          '201':
 *                   description: A successful response
 *          '400':
 *                   description: An error
 *                 
 */
route.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
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
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created Succesfully",
                  user: result
                });
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


//login up for user
/**
 * @swagger
 * /users/passenger/login/:
 *    post:
 *      description: checks the login
 *      parameters:
 *              - name: reqBody
 *                description: request body
 *                in: body
 *                schema:
 *                    type: object
 *                    properties:
 *                       email:
 *                          type: String
 *                       userId:
 *                          type: String
 *                       password:
 *                          type: String
 *                       
 *      responses:
 *          '201':
 *                   description: A successful response
 *          '400':
 *                   description: An error
 *                 
 */
route.post("/passenger/login", (req, res, next) => {
  User.find({ email: req.body.email })
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
            newuser: user[0],
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


//deleting a flight throught FLight ID
/**
 * @swagger
 * /users/{id}:
 *  delete:
 *         description: delete by id
 *         parameters:
 *           - name: id
 *             description: id to get by
 *             in: path
 *             type: string
 *             required: true
 * 
 *         responses:
 *             '200':
 *                    description: A successful response
 *             '500':
 *                    description: An Error
 */

route.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((resst) => {
      console.log(resst);
      res.status(200).json({
        message: "User Deleted Succesfully",
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
