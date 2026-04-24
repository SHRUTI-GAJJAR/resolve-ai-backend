require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./src/config/db");
const logger = require("./src/utils/logger");
const ticketRoutes = require("./src/routes/ticket.routes");
const errorMiddleware = require("./src/middlewares/error.middleware");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use("/api/tickets", ticketRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});