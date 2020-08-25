const mongoose = require("mongoose");

const passengerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bookId: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  number: { type: String, required: true },
  // dob: { type: Date, required: true },
  Nationality: { type: String, required: true },
  flightID: { type: String, ref: "Flight", required: true },
  status: { type: String, default: "unBooked" },
});

module.exports = mongoose.model("Passenger", passengerSchema);
