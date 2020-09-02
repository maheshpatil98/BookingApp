const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://mahesh:mahesh@testing.qwtsu.mongodb.net/flight2?retryWrites=true&w=majority",
    () => {
        console.log("Connected to database succesfully..");
    }
);