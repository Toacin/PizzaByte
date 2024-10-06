const jwt = require("jsonwebtoken");
const log = require("../log");

const secret = process.env.JWT_SECRET;

// tokens will expire in 90000 seconds (25 hours)
const expiration = 90000;

// create a set of paths that do not need authentication
const unauthenticatedPaths = new Set([
  "/api/auth/login",
  "/api/auth/signup",
  "/api/testRoute",
]);

// check if the path is in the set of unauthenticated paths
const shouldSkipAuth = (req) => {
  return unauthenticatedPaths.has(req.path);
};

const authenticateToken = (req, res, next) => {
  if (shouldSkipAuth(req)) {
    return next();
  }

  // pull the token from the request headers and remove the Bearer prefix
  let token = req.headers.authorization.split(" ").pop().trim();

  // if the token is a falsy value return an error
  if (!token) {
    log.info("Authentication failed - no token provided");
    return res.sendStatus(401);
  }

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

module.exports = authenticateToken;
