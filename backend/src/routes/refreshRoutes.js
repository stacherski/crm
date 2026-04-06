const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authToken = require("../middleware/authToken");

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: Refresh user token after it expires
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthUser'
 *     responses:
 *       200:
 *         description: Token refreshed
 *       403:
 *         description: Invalid refresh token
 */

router.post("/", authToken, (req, res) => {
  const refreshToken = req.cookies.crmRefreshToken

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" })
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )

    const payload = {
      _id: decoded._id,
      role: decoded.role,
      permissions: decoded.permissions,
      name: decoded.name + " " + decoded.surname,
    }

    const newAccessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    )

    res.cookie("crmAccessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 15 * 60 * 1000
    })

    res.status(200).json({ message: "Token refreshed" })
  } catch {
    return res.status(403).json({ message: "Invalid refresh token" })
  }
})
