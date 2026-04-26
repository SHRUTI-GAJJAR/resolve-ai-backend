const Ticket = require("../models/ticket.model");
const { analyzeTicket } = require("../ai/ai.service");

const createTicket = async (text) => {
  try {
    let aiResult;

    try {
      aiResult = await analyzeTicket(text);
    } catch (err) {
      console.error("AI FAILED:", err.message);

      aiResult = {
        category: "General",
        priority: "Low",
        response: "We are looking into your issue."
      };
    }

    const ticket = await Ticket.create({
      text,
      category: aiResult.category,
      priority: aiResult.priority,
      response: aiResult.response
    });

    return ticket;
  } catch (error) {
    console.error("SERVICE ERROR:", error);
    throw error;
  }
};

const getAllTickets = async () => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    return tickets;
  } catch (error) {
    throw new Error("Failed to fetch tickets");
  }
};

const getTicketById = async (id) => {
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      const error = new Error("Ticket not found");
      error.statusCode = 404;
      throw error;
    }
    return ticket;
  } catch (error) {
    throw error;
  }
};

module.exports = { createTicket, getAllTickets,getTicketById };
