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

  // test the /api/auth/signup endpoint (happy, existing user paths, missing credentials)
  it("/api/auth/signup should create a new user just once, no duplicate user, and no user without all credentials", async () => {
    const response = await request(serverApp).post("/api/auth/signup").send({
      email: "john@testEmail.com",
      firstName: "John",
      password: "password",
    });

    // do the same thing to check that user already exists
    const response2 = await request(serverApp).post("/api/auth/signup").send({
      email: "john@testEmail.com",
      firstName: "John",
      password: "password",
    });

    // check for missing credentials
    const response3 = await request(serverApp).post("/api/auth/signup");

    // check the responses
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Signup complete");

    expect(response2.status).toBe(400);
    expect(response2.body.error).toBe(true);
    expect(response2.body.message).toBe("User already exists");

    expect(response3.status).toBe(400);
    expect(response3.body.error).toBe(true);
    expect(response3.body.message).toBe("All fields are required");
  });

  // test the /api/auth/login endpoint (happy, existing user paths, missing credentials)
  it("/api/auth/login should login user and no user without all credentials", async () => {
    // signup a user first
    await request(serverApp).post("/api/auth/signup").send({
      email: "john@testEmail.com",
      firstName: "John",
      password: "password",
    });

    // signedup user should be able to login
    const response = await request(serverApp).post("/api/auth/login").send({
      email: "john@testEmail.com",
      password: "password",
    });

    // do the same thing to check a non existing user
    const response2 = await request(serverApp).post("/api/auth/login").send({
      email: "john@testEmail.commmm",
      password: "john@pizzaByte.com",
    });

    // check for missing credentials
    const response3 = await request(serverApp).post("/api/auth/login");

    // invalid password
    const response4 = await request(serverApp).post("/api/auth/login").send({
      email: "john@testEmail.com",
      password: "123456789",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login Complete");

    expect(response2.status).toBe(400);
    expect(response2.body.error).toBe(true);
    expect(response2.body.message).toBe("Invalid email or password");

    expect(response3.status).toBe(400);
    expect(response3.body.error).toBe(true);
    expect(response3.body.message).toBe("All fields are required");

    expect(response4.status).toBe(400);
    expect(response4.body.error).toBe(true);
    expect(response4.body.message).toBe("Invalid email or password");

    // delete the user
    await PizzaByteUser.destroy({ where: { email: "john@testEmail.com" } });
  });
});
