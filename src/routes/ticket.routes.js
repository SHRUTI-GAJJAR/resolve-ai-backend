const express = require("express");
const router = express.Router();

const {
  createTicketController,
  getAllTicketsController,
  getTicketByIdController
} = require("../controllers/ticket.controller");

const validateMiddleware = require("../middlewares/validate.middleware");

router.post("/", validateMiddleware, createTicketController);
router.get("/", getAllTicketsController);
router.get("/:id", getTicketByIdController);

module.exports = router;