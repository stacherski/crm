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
  res.clearCookie("crmAuthToken");
  res.clearCookie("crmRefreshToken");
  res.sendStatus(200);
  // res.status(204).json({ message: "Logged out successfully!" });
});

module.exports = router;
