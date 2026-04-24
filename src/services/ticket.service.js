const Ticket = require("../models/ticket.model");
const { analyzeTicket } = require("../ai/ai.service");

const createTicket = async (text) => {
  try {
    const aiResult = await analyzeTicket(text);

    const ticket = await Ticket.create({
      text,
      category: aiResult.category,
      priority: aiResult.priority,
      response: aiResult.response
    });

    return ticket;
  } catch (error) {
    throw new Error("Failed to create ticket");
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

module.exports = { createTicket, getAllTickets };
