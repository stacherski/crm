const express = require("express");
const router = express.Router({ caseSensitive: false });
const User = require("../models/User");

// Middleware to get user by name
async function getUserByName(req, res, next) {
  let user;

  try {
    user = await User.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = getUserByName;
