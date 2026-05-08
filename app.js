require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const connectDB = require("./src/config/db");
const logger = require("./src/utils/logger");

const ticketRoutes = require("./src/routes/ticket.routes");
const authRoutes = require("./src/routes/auth.routes");

const errorMiddleware = require("./src/middlewares/error.middleware");

const passport = require("./src/config/passport");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

/**
 * SESSION MIDDLEWARE
 */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

/**
 * PASSPORT
 */
app.use(passport.initialize());
app.use(passport.session());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/**
 * ROUTES
 */
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

/**
 * ERROR MIDDLEWARE
 */
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});