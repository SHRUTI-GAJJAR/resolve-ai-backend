const logger = require("../utils/logger");

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  logger.error(err.message);
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

module.exports = errorMiddleware;