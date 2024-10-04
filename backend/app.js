require("dotenv").config();
const startServer = require("./server");

async function startApp() {
  // start server
  const { httpServer } = startServer();

  // Graceful shutdown
  const shutdown = () => {
    httpServer.close(() => {
      console.log("HTTP server closed.");
    });
  };

  // Handle signal terminations and signal interruptions
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startApp();
