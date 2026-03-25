const express = require("express");
const router = express.Router();
const User = require("../models/User");
const getUserByName = require("../middleware/getUsersByName");

/**
 * @openapi
 * /api/user:
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
 *                 $ref: '#/components/schemas/User'
 */

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

/** @openapi
 * /api/user/name/{name}:
 *   get:
 *     summary: Get user by name
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/name/:name", getUserByName, async (req, res) => {
  if (req.params.name == null) {
    res.status(400).json({ message: "User name is required" });
  }
  const users = await User.find({ name: req.params.name });
  res.status(200).json(users);
});

module.exports = router;
