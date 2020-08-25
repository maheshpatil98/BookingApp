const mongoose = require("mongoose");

const flightSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  flightId: { type: String, required: true, unique: true },
  flightSource: { type: String, required: true },
  flightDestination: { type: String, required: true },
  flightArrival: { type: String, required: true },
  flightDeparture: { type: String, required: true },
});
module.exports = mongoose.model("Flight", flightSchema);
