const express = require("express");
const router = express.Router({ caseSensitive: false });
const Company = require("../models/Company");

// Middleware to get Company by ID
async function getCompanyByID(req, res, next) {
  let company;
  try {
    company = await Company.findById(req.params.id);
    if (company == null) {
      return res.status(404).json({ message: "Company not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.company = company;
  next();
}

module.exports = getCompanyByID;
