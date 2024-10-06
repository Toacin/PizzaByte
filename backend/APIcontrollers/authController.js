const { PizzaByteUser } = require("../models");
const log = require("../logger");
const signAuthToken = require("../utils/signAuthToken");

const signup = async (req, res) => {
  const { firstName, email, password, role = "user" } = req.body;
  if (!firstName || !email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }

  try {
    // check if email already exists
    const existingUser = await PizzaByteUser.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists" });
    }

    // create user
    const newUser = await PizzaByteUser.create({
      firstName,
      email,
      password,
      role,
    });
    const signedToken = signAuthToken(
      newUser.firstName,
      newUser.email,
      newUser.id,
      newUser.role,
    );

    const createdUserJSON = newUser.toJSON();
    delete createdUserJSON.password;

    return res.status(201).json({
      user: createdUserJSON,
      token: signedToken,
      message: "Signup complete",
    });
  } catch (error) {
    log.error(error.toString());
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }

  try {
    // check if user exists
    const existingUser = await PizzaByteUser.findOne({ where: { email } });
    if (!existingUser) {
      log.error("no user found");
      return res
        .status(400)
        .json({ error: true, message: "Invalid email or password" });
    }

    // check if password is correct
    const isPasswordCorrect = await existingUser.checkPassword(password);
    if (!isPasswordCorrect) {
      log.error("wrong password");
      return res
        .status(400)
        .json({ error: true, message: "Invalid email or password" });
    }

    const signedToken = signAuthToken(
      existingUser.firstName,
      existingUser.email,
      existingUser.id,
      existingUser.role,
    );

    const userJSON = existingUser.toJSON();
    delete userJSON.password;

    return res.status(200).json({
      user: userJSON,
      token: signedToken,
      message: "Login Complete",
    });
  } catch (error) {
    log.error(error.toString());
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

module.exports = {
  signup,
  login,
};
