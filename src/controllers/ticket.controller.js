const { createTicket, getAllTickets } = require("../services/ticket.service");

const createTicketController = async (req, res, next) => {
  try {
    const { text } = req.body;
    const ticket = await createTicket(text);
    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
};

const getAllTicketsController = async (req, res, next) => {
  try {
    const tickets = await getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTicketController, getAllTicketsController };