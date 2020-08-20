const express = require('express');
const route = express.Router();
const auth = require('../middleware/checkAuth');
const { default: Axios } = require('axios');

route.get("/getflights",(req,res,next)=>{
    Axios.get("http://localhost:7001/flights/")
    .then(result=>{
        console.log(result);
        res.send(result.data);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

route.post("/addflight",auth,(req,res,next)=>{
    const flight = {
        flightSource: req.body.source,
        flightDestination : req.body.destination,
        flightArrival  : req.body.arrival,
        flightDeparture : req.body.departure
    }
    Axios.post("http://localhost:7001/flights/",flight)
    .then(result=>{
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = route;

