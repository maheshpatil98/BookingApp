const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const Passenger = require('../models/Passenger-schema');
const { strict } = require('assert');

route.get('/', (req,res,next)=>{
    
    Passenger.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            count : result.length,
            passengers : result
            });      
        })
        .catch(err=>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });

});


//post one id
route.post('/',(req,res,next)=>{
    const newPassenger = new Passenger({
        _id : req.body.firstname.slice(0,3) +req.body.FlightId+ new Date().getSeconds(),
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        number : req.body.number,
        dob  : req.body.dob,
        Nationality : req.body.Nationality,
        Flight : req.body.FlightId,
        status : req.body.status
    });
    newPassenger.save()
    .then(result=>{
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

//Search   get one id
route.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
    Passenger.findById(id)
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(result);
    });
});

//update
route.patch('/:Id',(req,res,next)=>{
    const id = req.params.Id;
    const updateOps ={};
    for(const ops of req.body){
        updateOps[ops.propName]= ops.value;
    }
    Passenger.update({_id:id},{ $set:updateOps})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

//delete
route.delete('/:Id',(req,res,next)=>{
    const id = req.params.Id;
    Passenger.remove({_id:id})
    .exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json({
            msg :"Succesfully deleted ",
            count : doc.deletedCount
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});


module.exports = route;