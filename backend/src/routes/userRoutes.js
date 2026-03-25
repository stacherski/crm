const express = require("express");
const bcrypt = require("bcrypt");
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

/** @openapi
 * /api/user/:
 *   post:
 *     summary: Create new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: "Ashoka"
 *             surname: "Pako"
 *             email: "ashoka@gmail.com"
 *             password: "password"
 *             role: "admin"
 *             status: "active"
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.post("/", async (req, res) => {
  try {
    const { name, surname, email, password, role, status } = req.body;

    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      surname: surname,
      email: email,
      passwordHash: hashedPassword,
      role: role,
      status: status,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
