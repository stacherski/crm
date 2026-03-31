const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authToken = require("../middleware/authToken");

// /api/me
router.get("/", authToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
