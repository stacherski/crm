require("dotenv").config();
const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  const token = req.cookies.crmAuthToken;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = authToken;
