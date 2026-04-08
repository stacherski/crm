const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authToken = require("../middleware/authToken");

/**
 * @openapi
 * /auth/me:
 *   post:
 *     summary: Get current logged user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User found and returned successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthUser'
 *       401:
 *         description: User not found or not authorized
 */
router.get("/", authToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const payload = {
      _id: user._id,
      role: user.role,
      permissions: user.permissions,
      name: user.name + " " + user.surname,
      importance: user.importance
    }

    res.json(payload);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
