const express = require('express');
const { default: Axios } = require('axios');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routers/users');
const flightRoute = require("./routers/Admin");


mongoose.connect('mongodb+srv://mahesh:mahesh@testing.qwtsu.mongodb.net/flight?retryWrites=true&w=majority',()=>{
    console.log("Connected to database succesfully..");
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/users",userRoute);
app.use("/flights",flightRoute);

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        message : error.message        
    })
})

module.exports = app;