// this logger is used for more robust logging, allowing for different levels of logging, and saving logs to files
const winston = require("winston");

let logger;

const format = () => {
  return winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.level}]: ${info.message}`;
    }),
  );
};

const level = () => {
  return process.env.LOG_LEVEL || "info";
};

const devConsoleTransport = new winston.transports.Console({
  stderrLevels: ["error", "warn"],
  level: level(),
  format: winston.format.combine(winston.format.colorize(), format()),
});

const prodConsoleTransport = new winston.transports.Console({
  level: level(),
  format: format(),
});

const errorFileTransport = new winston.transports.File({
  level: "warn",
  lazy: false,
  filename: "logs/errors.log",
  tailable: true,
  maxFiles: 10,
  format: format(),
});

const debugFileTransport = new winston.transports.File({
  level: "silly",
  lazy: false,
  filename: "logs/debug.log",
  tailable: true,
  maxFiles: 10,
  format: format(),
});

const transports = () => {
  if (process.env.NODE_ENV == "production") {
    return [prodConsoleTransport];
  } else {
    return [devConsoleTransport, errorFileTransport, debugFileTransport];
  }
};

logger ||= winston.createLogger({
  level: level(),
  transports: transports(),
});

module.exports = logger;
