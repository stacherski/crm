const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful logout
 *       401:
 *         description: Unauthorized
 */

router.post("/", (req, res) => {
  res.clearCookie("crmAuthToken", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully!" });
});

module.exports = router;
