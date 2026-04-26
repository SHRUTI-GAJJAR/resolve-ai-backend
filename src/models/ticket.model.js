const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      enum: [
        "Account Issue",
        "Payment Issue",
        "Technical Issue",
        "Bug Report",
        "Login Issue",
        "Refund Request",
        "Feature Request",
        "General Inquiry"
      ],
      default: "General Inquiry"
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },

    status: {
      type: String,
      enum: ["open", "in-progress", "closed"],
      default: "open"
    },

    response: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);