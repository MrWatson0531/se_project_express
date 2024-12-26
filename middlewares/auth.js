const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

function auth(req, res, next) {
  const { authorization } = req.headers;

  // error checks to make sure authorization variable is valid

  const token = authorization.replace("Bearer ", "");

  let payload;

  // Maybe wrap this logic in a try/catch
  payload = jwt.verify(token, JWT_SECRET);

  req.user = payload;
  return next();
}

module.exports = auth;
