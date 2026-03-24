const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const User = require("../models/User");
const Pipeline = require("../models/Pipeline");
const Contact = require("../models/Contact");

/**
 * @openapi
 * /api/companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: A list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: 'models/Company'
 */

router.get("/", async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

router.post("/", async (req, res) => {
  const body = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const company = await Company.create(body);
  res.json(company);
});

module.exports = router;
