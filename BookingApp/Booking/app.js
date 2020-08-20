const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const bookRoute = require('./api/routes/Booking-route');

mongoose.connect('mongodb+srv://mahesh:mahesh@testing.qwtsu.mongodb.net/flight?retryWrites=true&w=majority',()=>{
    console.log("Connected to database succesfully..");
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/bookings',bookRoute);

module.exports = app;
