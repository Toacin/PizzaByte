const jwt = require("jsonwebtoken");
const log = require("../logger");

const secret = process.env.JWT_SECRET;

// tokens will expire in 90000 seconds (25 hours)
const expiration = 90000;

const optionalAuthenticateToken = (req, res, next) => {
  // pull the token from the request headers and remove the Bearer prefix
  let token = req.headers.authorization;

  // if the token is a falsy value return an error
  if (!token) {
    next();
    return;
  }

  token = token.split(" ").pop().trim();

  // we have a token so now we try to verify it
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    log.info("Authentication failed - invalid token");
    return res.sendStatus(403);
  }

  next();
};

module.exports = optionalAuthenticateToken;
