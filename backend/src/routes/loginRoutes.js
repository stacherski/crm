const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthUser'
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // Generate JWT token
  const accessToken = jwt.sign(
    { user: user },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    },
  );

  res.cookie("crmAuthToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 3600000,
  });

  res.status(200).json({ message: `Logged in successfully!` });
});

module.exports = router;
