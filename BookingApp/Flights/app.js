const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mporgan = require('morgan');

const bodyParser = require('body-parser');
const flightRoute = require('./api/routes/Flight-route');
const morgan = require('morgan');

mongoose.connect('mongodb+srv://mahesh:mahesh@testing.qwtsu.mongodb.net/flight?retryWrites=true&w=majority',()=>{
    console.log("Connected to database succesfully..");
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/flights',flightRoute);

module.exports = app;
