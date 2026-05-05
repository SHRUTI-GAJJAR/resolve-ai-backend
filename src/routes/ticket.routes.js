const express = require("express");
const router = express.Router();

const {
  createTicketController,
  getAllTicketsController,
  getTicketByIdController
} = require("../controllers/ticket.controller");

const validateMiddleware = require("../middlewares/validate.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/",
  authMiddleware,
  validateMiddleware,
  createTicketController
);

router.get(
  "/",
  authMiddleware,
  getAllTicketsController
);

router.get(
  "/:id",
  authMiddleware,
  getTicketByIdController
);

module.exports = router;