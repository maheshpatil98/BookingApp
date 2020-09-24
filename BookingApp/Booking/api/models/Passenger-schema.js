const mongoose = require("mongoose");

const passengerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bookId: { type: String, required: true, unique: true },
  useridentification: { type: String, required: true, unique: false },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  amount: { type: Number, required: true },
  Nationality: { type: String, required: true },
  flightID: { type: String, ref: "Flight", required: true },
  status: { type: String, default: "BOOKED" },
});

module.exports = mongoose.model("Passenger", passengerSchema);
