const express = require("express");
const router = express.Router({ caseSensitive: false });
const User = require("../models/User");

// Middleware to get User by ID
async function getUserByID(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = getUserByID;
