const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

route.post("/signup",(req,res,next)=>{
    User.find({email : req.body.email})
    .exec()
    .then(user=>{
        if(user.length >= 1){
            return res.status(409).json({
                message: "Mail Exist"
            });
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                } else{
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password : hash
                });
                user.save()
                .then(result=>{
                    console.log(result);
                    res.status(201).json({
                        msg: "User created"
                    })
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({
                        error : err
                    });
                });
            }
        }
        );
        }
    })
    
});

route.post("/login",(req,res,next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message : 'AUth failed'
                });
            }
            if(result){
                const token =jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }
                , process.env.JWT_KEY,
                {
                    expiresIn:"1h"
                });
                return res.status(200).json({
                    message:"Auth Succesful",
                    token:token
                });
            }
             res.status(401).json({
                message : 'AUth failed'
            })
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            eroor: err
        });
    });
});

route.delete("/:userId",(req, res, next)=>{
    User.remove({ _id: req.params.userId})
    .exec()
    .then(resst=>{
        console.log(resst);
        res.status(200).json({
            message: "User Deleted Succesfully"
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

module.exports= route;