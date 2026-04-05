const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");
const Company = require("../models/Company");
const getUserByID = require("../middleware/getUserById");
const hashPassword = require("../middleware/hashPassword");
const userPermissions = require("../middleware/userPermissions")

const permissions = {
  all: ["user:read"],
  query: ["user:read"],
  byid: ["user:read"],
  company: ["user:read", "company:read"],
  add: ["user:write"],
  patch: ["user:write"],
  delete: ["user:delete"],
}
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
 *       500:
 *         description: "Error: Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Error message"}
 */

router.get("/all", userPermissions(permissions.all), async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

/**
 * @openapi
 * /api/user/query:
 *   get:
 *     summary: Get all users filtered by query
 *     description: |
 *       **Notes:**
 *       - Calling enpoint without query parameters will simply return all users, matching <b>/api/user/all</b> endpoint.
 *       - Query can be passed to endpoint to filter down by multiple fields.
 *       - Allowed fields are: _id, name, surname, email, phone, status, role, lastLogin, createdAt, updatedAt
 *       - For name, surname, email & phone fields query will search for passed value within field
 *       - Example query: <b>?name=John&email=gmail.com</b>
 *       - No support for passing query within Swagger API Docs, use Insomnia or Postman
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
 *       500:
 *         description: "Error: Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Error message"}
 */

router.get("/query", userPermissions(permissions.query), async (req, res) => {
  const allowedFields = [
    "_id",
    "name",
    "surname",
    "phone",
    "email",
    "status",
    "role",
    "lastLogin",
    "createdAt",
    "updatedAt",
  ];
  const query = {};

  console.log("q:", req.query);
  for (const [key, value] of Object.entries(req.query)) {
    if (!allowedFields.includes(key)) continue;

    if (key === "name") {
      query.name = { $regex: value, $options: "i" };
      continue;
    }

    if (key === "surname") {
      query.surname = { $regex: value, $options: "i" };
      continue;
    }

    if (value.includes(",")) {
      query[key] = { $in: value.split(",") };
      continue;
    }

    if (key === "phone") {
      query.phone = { $regex: value, $options: "i" };
      continue;
    }

    if (key === "email") {
      query.email = { $regex: value, $options: "i" };
      continue;
    }
    query[key] = value;
  }

  const users = await User.find(query);
  res.status(200).json(users);
});

/** //@openapi
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       400:
 *         description: User's ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "User's ID is required"}
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "User not found"}
 *       200:
 *         description: Single user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/:id", userPermissions(permissions.byid), getUserByID, async (req, res) => {
  if (req.params.id == null) {
    res.status(400).json({ message: "User ID is required" });
  }
  const users = await User.find({ _id: req.params.id });
  res.status(200).json(users);
});

/** @openapi
 * /api/user/{id}/company:
 *   get:
 *     summary: Get companies with brokerID
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
 *                 $ref: '#/components/schemas/Company'
 *       200:
 *         description: Single user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */

router.get("/:id/company", userPermissions(permissions.company), async (req, res) => {
  if (req.params.id == null) {
    res.status(400).json({ message: "User ID is required" });
  }
  const company = await Company.find({ brokerId: req.params.id });
  res.status(200).json(company);
});

/** @openapi
 * /api/user/add:
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
 *             roleId: "reference to Role ID"
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

router.post("/add", userPermissions(permissions.add), async (req, res) => {
  try {
    const { name, surname, email, password, roleId, status } = req.body;

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
      roleId: roleId,
      status: status,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/** @openapi
 * /api/user/patch/{id}:
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

router.patch("/patch/:id", userPermissions(permissions.patch), hashPassword, getUserByID, async (req, res) => {
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
  if (req.body.roleId != null) {
    res.user.roleId = req.body.roleId;
  }
  if (req.body.role != null) {
    res.user.role = req.body.role;
  }
  if (req.body.permissions != null) {
    res.user.permissions = req.body.permissions;
  }
  if (req.body.status != null) {
    res.user.status = req.body.status;
  }
  if (req.body.passwordHash != null) {
    res.user.passwordHash = req.body.passwordHash;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/** @openapi
 * /api/user/delete/{id}:
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

router.delete("delete/:id", userPermissions(permissions.delete), getUserByID, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: `User ID: ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
