const request = require("supertest");
const startServer = require("../../server");
const { PizzaByteUser, PizzaByteClassics } = require("../../models");

describe("GET /api/classics", () => {
  let server;
  let serverApp;

  beforeAll(async () => {
    // start the server before tests
    const { httpServer, app } = startServer();
    server = httpServer;
    serverApp = app;

    // delete the user
    await PizzaByteUser.destroy({ where: { email: "john@testEmail.com" } });
  });

  afterEach(async () => {
    // delete the user
    await PizzaByteUser.destroy({ where: { email: "john@testEmail.com" } });
  });

  afterAll((done) => {
    // Close the server after tests
    server.close(done);
  });

  // test the /api/classics endpoint
  it("/api/classics should create a new classic without duplicate", async () => {
    const createdUser = await request(serverApp).post("/api/auth/signup").send({
      email: "john@testEmail.com",
      firstName: "John",
      password: "password",
      role: "chef",
    });
    const userToken = createdUser.body.token;
    const mockOrder = {
      name: "Meat Lovers",
      toppingsStringified: JSON.stringify({
        jalapeno: true,
        pepperoni: true,
      }),
    };

    // submit an order for a logged in user
    const response = await request(serverApp)
      .post("/api/classics")
      .send(mockOrder)
      .set("Authorization", `Bearer ${userToken}`);

    // submit an order for a duplicate classic
    const response2 = await request(serverApp)
      .post("/api/classics")
      .send(mockOrder)
      .set("Authorization", `Bearer ${userToken}`);

    // delete the classic
    const response3 = await request(serverApp)
      .delete(`/api/classics/${response.body.classic.id}`)
      .set("Authorization", `Bearer ${userToken}`);

    // check the responses
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Classic added successfully");

    expect(response2.status).toBe(400);
    expect(response2.body.error).toBe(true);
    expect(response2.body.message).toBe("Classic already exists");

    expect(response3.status).toBe(200);
    expect(response3.body.message).toBe("Classic deleted successfully");
  });
});
