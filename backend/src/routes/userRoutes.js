const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");
const getUserByName = require("../middleware/getUserByName");
const getUserByID = require("../middleware/getUserById");

/**
 * @openapi
 * /api/user/all:
 *   get:
 *     summary: Get all users
 *     tags: [User]
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

router.get("/all", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

/** @openapi
 * /api/user/id/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: Single user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/id/:id", getUserByID, async (req, res) => {
  if (req.params.id == null) {
    res.status(400).json({ message: "User ID is required" });
  }
  const users = await User.find({ name: req.params.name });
  res.status(200).json(users);
});

/** @openapi
 * /api/user/name/{name}:
 *   get:
 *     summary: Get user by name
 *     tags: [User]
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
 *     tags: [User]
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
 *               type: object
 *               $ref: '#/components/schemas/UserCreated'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Bad request"}
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

/** @openapi
 * /api/user/{id}:
 *   patch:
 *     summary: Update user data
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
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
 *               type: object
 *               $ref: '#/components/schemas/UserCreated'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Bad request"}
 */

router.patch("/:id", getUserByID, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.surname != null) {
    res.user.description = req.body.surname;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.role != null) {
    res.user.role = req.body.role;
  }
  if (req.body.status != null) {
    res.user.status = req.body.status;
  }
  if (req.body.password != null && req.body.password.length > 7) {
    res.user.passwordHash = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/** @openapi
 * /api/user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "User ID: {id} deleted"}
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Bad request"}
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "User not found"}
 *       500:
 *         description: Server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: object
 *               example: "500 Server error"
 */

router.delete("/:id", getUserByID, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: `User ID: ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
