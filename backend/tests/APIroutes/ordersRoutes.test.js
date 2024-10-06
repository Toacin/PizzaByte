const request = require("supertest");
const startServer = require("../../server");
const { PizzaByteUser } = require("../../models");

describe("GET /api/auth", () => {
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

  // test the /api/orders/createOrder endpoint
  it("/api/orders/createOrder should create a new user just once, no duplicate user, and no user without all credentials", async () => {
    const createdUser = await request(serverApp).post("/api/auth/signup").send({
      email: "john@testEmail.com",
      firstName: "John",
      password: "password",
    });
    const userToken = createdUser.body.token;
    const mockOrder = JSON.stringify([
      {
        name: "Pizza",
        toppings: {
          jalapeno: true,
          pepperoni: true,
        },
      },
    ]);

    // submit an order for a logged in user
    const response = await request(serverApp)
      .post("/api/orders/createOrder")
      .send({
        orderStringified: mockOrder,
      })
      .set("Authorization", `Bearer ${userToken}`);

    // submit an order for a guest
    const response2 = await request(serverApp)
      .post("/api/orders/createOrder")
      .send({
        orderStringified: mockOrder,
      });

    // submit an order without orderStringified
    const response3 = await request(serverApp).post("/api/orders/createOrder");

    // check the responses
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Order created successfully");

    expect(response2.status).toBe(201);
    expect(response2.body.message).toBe("Order created successfully");

    expect(response3.status).toBe(400);
    expect(response3.body.error).toBe(true);
    expect(response3.body.message).toBe("Order stringified is required");
  });

  // test the /api/orders/getOrdersByUser endpoint (happy, existing user paths, missing credentials)
  it("/api/orders/getOrdersByUser should login user and no user without all credentials", async () => {
    const createdUser = await request(serverApp).post("/api/auth/signup").send({
      email: "john@testEmail.com",
      firstName: "John",
      password: "password",
    });
    const userToken = createdUser.body.token;
    const mockOrder = JSON.stringify([
      {
        name: "Pizza",
        toppings: {
          jalapeno: true,
          pepperoni: true,
        },
      },
    ]);

    // submit an order for a logged in user
    await request(serverApp)
      .post("/api/orders/createOrder")
      .send({
        orderStringified: mockOrder,
      })
      .set("Authorization", `Bearer ${userToken}`);

    // now get the orders
    const response = await request(serverApp)
      .get("/api/orders/getOrdersByUser")
      .set("Authorization", `Bearer ${userToken}`);

    // check the responses
    expect(response.status).toBe(200);
    expect(response.body.orders.length).toBe(1);
  });
});
