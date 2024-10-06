const request = require("supertest");
const startServer = require("../../server");
const { PizzaByteUser, PizzaByteToppings } = require("../../models");

describe("GET /api/toppings", () => {
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

  // test the /api/toppings endpoint
  it("/api/toppings should create a new topping without duplicate", async () => {
    const createdUser = await request(serverApp).post("/api/auth/signup").send({
      email: "john@testEmail.com",
      firstName: "John",
      password: "password",
      role: "owner",
    });
    const userToken = createdUser.body.token;
    const mockOrder = {
      toppingName: "Anchovies",
    };

    // submit an order for a logged in user
    const response = await request(serverApp)
      .post("/api/toppings")
      .send(mockOrder)
      .set("Authorization", `Bearer ${userToken}`);

    // submit an order for a duplicate topping
    const response2 = await request(serverApp)
      .post("/api/toppings")
      .send(mockOrder)
      .set("Authorization", `Bearer ${userToken}`);

    // delete the topping
    const response3 = await request(serverApp)
      .delete(`/api/toppings/${response.body.topping.id}`)
      .set("Authorization", `Bearer ${userToken}`);

    // check the responses
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Topping added successfully");

    expect(response2.status).toBe(400);
    expect(response2.body.error).toBe(true);
    expect(response2.body.message).toBe("Topping already exists");

    expect(response3.status).toBe(200);
    expect(response3.body.message).toBe("Topping deleted successfully");
  });
});
