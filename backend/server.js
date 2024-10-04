const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

function startServer() {
  const app = express();
  const port = process.env.PORT;
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  const httpServer = app.listen(port, () => {
    console.log("Backend Server listening on port " + port + ".");
  });

  return { app, httpServer };
}

module.exports = startServer;