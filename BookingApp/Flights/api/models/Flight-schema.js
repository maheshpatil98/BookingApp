const mongoose = require("mongoose");

const flightSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  flightId: { type: String, required: true, unique: true },
  flightSource: { type: String, required: true },
  flightDestination: { type: String, required: true },
  flightArrival: { type: String, required: true },
  flightDeparture: { type: String, required: true },
  amount: { type: Number, required: true },
  flightStatus: { type: String, required: true, default: "notArrived" }
});
module.exports = mongoose.model("Flight", flightSchema);
