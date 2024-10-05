const request = require("supertest");
const startServer = require("../../server");

describe("GET /api", () => {
  let server;
  let serverApp;

  beforeAll(() => {
    // start the server before tests
    const { httpServer, app } = startServer();
    server = httpServer;
    serverApp = app;
  });

  afterAll((done) => {
    // Close the server after tests
    server.close(done);
  });

  // test the /api/testRoute endpoint
  it("/api/testRoute should return John Doe!", async () => {
    const response = await request(serverApp).get("/api/testRoute");
    expect(response.status).toBe(200);
    expect(response.body).toBe("Hello John Doe!");
  });
});
