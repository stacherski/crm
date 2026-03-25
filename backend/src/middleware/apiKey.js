require("dotenv").config();

const API_KEY = process.env.API_KEY;

function apiKeyMiddleware(req, res, next) {
  if (!API_KEY) return next();

  const key = req.headers["x-api-key"] || req.query.api_key;

  if (!key || key !== API_KEY) {
    return res
      .status(401)
      .json({ error: "Unauthorized: invalid or missing API key" });
  }
  req.key = key;
  next();
}

module.exports = apiKeyMiddleware;
