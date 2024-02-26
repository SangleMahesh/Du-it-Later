const jwt = require("jsonwebtoken");
require("dotenv").config();
function getuid(request, res, next) {
  let token = request.headers?.cookie;
  if (!token) return res.redirect("/signin");
  token = token.split("=")[1];
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.redirect("/signin");
  }
}
module.exports = getuid;
