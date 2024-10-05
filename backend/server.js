const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const log = require("./logger");
const path = require("path");

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

  // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });

  const httpServer = app.listen(port, () => {
    log.info("Backend Server listening on port " + port + ".");
  });

  return { app, httpServer };
}

module.exports = startServer;
