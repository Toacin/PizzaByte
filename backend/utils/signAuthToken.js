const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

// tokens will expire in 90000 seconds (25 hours)
const expiration = 90000;

const signAuthToken = (firstName, email, id) => {
  const data = { firstName, email, id };

  return jwt.sign({ data }, secret, { expiresIn: expiration });
};

module.exports = signAuthToken;
