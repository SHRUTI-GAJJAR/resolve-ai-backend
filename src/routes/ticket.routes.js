const express = require("express");
const router = express.Router();

const {
  createTicketController,
  getAllTicketsController
} = require("../controllers/ticket.controller");

const validateMiddleware = require("../middlewares/validate.middleware");

router.post("/", validateMiddleware, createTicketController);
router.get("/", getAllTicketsController);

module.exports = router;