const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const User = require("../models/User");
const Pipeline = require("../models/Pipeline");
const Contact = require("../models/Contact");

router.get("/", async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

router.post("/", async (req, res) => {
  const company = await Company.create(req.body);
  res.json(company);
});

module.exports = router;
