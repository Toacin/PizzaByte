const expressWinston = require("express-winston");
const log = require("../log");

// for logging and monitoring all incoming requests
const middleware = expressWinston.logger({
  winstonInstance: log,
  meta: true,
  expressFormat: true,
  colorize: process.env.NODE_ENV === "production" ? false : true,
});

module.exports = middleware;
