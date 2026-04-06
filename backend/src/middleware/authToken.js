require("dotenv").config();
const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  const token = req.cookies.crmAuthToken;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; //this is the name of the variable to read from in later stages when info about user or permissions are pulled
    next();
  } catch {
    return res.status(401).json({ message: "Token expired" });
  }
}

module.exports = authToken;
