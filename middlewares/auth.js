const jwt = require("jsonwebtoken");
const { NOT_AUTHORIZED } = require("../utils/errors");

const JWT_SECRET = "Secret Password";

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(NOT_AUTHORIZED).send({ message: "User not authorized" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  // Maybe wrap this logic in a try/catch
  try {
    // trying to verify the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    /// return the error with the 401 status code
    return res.status(NOT_AUTHORIZED).send({ message: "User not authorized" });
  }

  req.user = payload;
  return next();
}

module.exports = { auth };
