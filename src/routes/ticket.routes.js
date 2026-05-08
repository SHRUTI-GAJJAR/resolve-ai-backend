const express = require("express");
const router = express.Router();

const {
  createTicketController,
  getAllTicketsController,
  getTicketByIdController
} = require("../controllers/ticket.controller");

const validateMiddleware = require("../middlewares/validate.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket management APIs
 */

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     description: Create support ticket and analyze using AI
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Payment Issue
 *               description:
 *                 type: string
 *                 example: My payment failed but money deducted
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authMiddleware,
  validateMiddleware,
  createTicketController
);

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets
 *     description: Fetch all support tickets for logged in user
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tickets fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  authMiddleware,
  getAllTicketsController
);

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     description: Fetch single ticket details using ticket ID
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ticket ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket fetched successfully
 *       404:
 *         description: Ticket not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/:id",
  authMiddleware,
  getTicketByIdController
);

module.exports = router;