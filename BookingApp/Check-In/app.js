const express = require('express');
const { default: Axios } = require('axios');
const app = express();
const payRoute = require('./routers/Payement');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routers/users');
const flightRoute = require("./routers/Admin");
const morgan = require('morgan');


mongoose.connect(
    process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
        console.log("Connected to databse succesfully");
    }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        "Origin,X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');
        return res.status(200).json({});
    }
    next();
})


const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Check-In API",
            description: "Check-In API Information",
            contact: {
                name: "Mahesh Patil"
            },
            servers: ["http://localhost:7003"]
        }
    },
    // ['.routes/*.js']
    apis: ['./routers/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use("/users", userRoute);
app.use("/flights", flightRoute);
app.use("/pay", payRoute);

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    })
})

module.exports = app;