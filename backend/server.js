const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const log = require("./logger");

function startServer() {
  const app = express();
  const port = process.env.PORT;
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.get("/api", (req, res) => {
    res.json("Hello World!");
  });

  const httpServer = app.listen(port, () => {
    log.info("Backend Server listening on port " + port + ".");
  });

  return { app, httpServer };
}

module.exports = startServer;
