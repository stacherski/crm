const express = require("express");
const router = express.Router();
const User = require("../models/User");

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: 'models/User'
 */

router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

module.exports = router;
