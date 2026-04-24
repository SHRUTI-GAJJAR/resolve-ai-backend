const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    category: {
      type: String,
      enum: ["Billing", "Technical", "Account", "General"],
      required: true
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true
    },
    response: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);