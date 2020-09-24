const mongoose = require("mongoose");

const payDetailsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { type: String },
    entity: { type: String },
    amount: { type: Number },
    amount_paid: { type: Number },
    amount_due: { type: Number },
    currency: { type: String },
    receipt: { type: String },
    offer_id: { type: String },
    status: { type: String },
    attempts: { type: Number },
    created_at: { type: Number }
});

module.exports = mongoose.model("Pay", payDetailsSchema);