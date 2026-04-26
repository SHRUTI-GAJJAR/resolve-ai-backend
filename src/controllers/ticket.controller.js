const { createTicket, getAllTickets,getTicketById } = require("../services/ticket.service");

const createTicketController = async (req, res, next) => {
  try {
    const { text } = req.body;
    const ticket = await createTicket(text);

    res.status(201).json({
      message: `Your issue is classified as ${ticket.category}`,
      response: ticket.response
    });

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

const getTicketByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ticket = await getTicketById(id);
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTicketController, getAllTicketsController, getTicketByIdController };