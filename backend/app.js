require("dotenv").config();
const startServer = require("./server");
const log = require("./logger");

async function startApp() {
  // start server
  const { httpServer } = startServer();

  // Graceful shutdown
  const shutdown = () => {
    httpServer.close(() => {
      log.info("HTTP server closed.");
    });
  };

  // Handle signal terminations and signal interruptions
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startApp();
