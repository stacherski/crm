const express = require("express");
const router = express.Router();
const Role = require("../models/Role");

/**
 * @openapi
 * /api/role:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: A list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: "Error: Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Error message"}
 */

router.get("/", async (req, res) => {
    const role = await Role.find();
    res.status(200).json(role);
});

module.exports = router;