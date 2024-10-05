const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const log = require("./logger");
const path = require("path");

function startServer() {
  const app = express();
  const port = process.env.PORT || 3001;

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // Serve static files from the React app's build directory
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // API endpoint
  app.get("/api", (req, res) => {
    res.json("Hello World!");
  });

  // Catch-all route: for React client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });

  const httpServer = app.listen(port, () => {
    log.info("Backend Server listening on port " + port + ".");
  });

  return { app, httpServer };
}

module.exports = startServer;
