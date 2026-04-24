const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const fileFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.json()
);

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

const logger = createLogger({
  level: "info",
  levels: {
    error: 0,
    warn: 1,
    info: 2
  },
  transports: [
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      format: fileFormat
    }),
    new transports.File({
      filename: path.join(logDir, "combined.log"),
      format: fileFormat
    }),
    new transports.Console({
      format: consoleFormat
    })
  ],
  exitOnError: false
});

module.exports = logger;