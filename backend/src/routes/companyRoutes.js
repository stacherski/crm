const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
// const User = require("../models/User");
// const Pipeline = require("../models/Pipeline");
// const Contact = require("../models/Contact");

const getCompanyByID = require("../middleware/getCompanyById");

/**
 * @openapi
 * /api/company/all:
 *   get:
 *     summary: Get all companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: A list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Bad request"}
 */

router.get("/all", async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

/**
 * @openapi
 * /api/company/query:
 *   get:
 *     summary: Get companies filtered by query
 *     description: |
 *       **Notes:**
 *       - Calling enpoint without query parameters will simply return all users, matching <b>/api/company/all</b> endpoint.
 *       - Query can be passed to endpoint to filter down by multiple fields.
 *       - Allowed fields are: _id, name, address, city, postCode, email, phone, vat, status, companyType, contactMethods, brokerId, createdAt, updatedAt
 *       - For name, address, email, phone, vat fields query will search for passed value within field
 *       - Example query: <b>?name=ACME&email=gmail.com</b>
 *       - No support for passing query within Swagger API Docs, use Insomnia or Postman
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: A list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Bad request"}
 */

router.get("/query", async (req, res) => {
  const allowedFields = [
    "_id",
    "name",
    "address",
    "city",
    "postCode",
    "email",
    "phone",
    "vat",
    "status",
    "companyType",
    "contactMethods",
    "brokerId",
    "createdAt",
    "updatedAt",
  ];
  const query = {};

  for (const [key, value] of Object.entries(req.query)) {
    if (!allowedFields.includes(key)) continue;

    if (key === "name") {
      query.name = { $regex: value, $options: "i" };
      continue;
    }

    if (key === "address") {
      query.address = { $regex: value, $options: "i" };
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

    if (key === "vat") {
      query.vat = { $regex: value, $options: "i" };
      continue;
    }
    query[key] = value;
  }
  const companies = await Company.find(query);
  res.json(companies);
});

/**
 * @openapi
 * /api/company/add:
 *  post:
 *     summary: Create new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *           example:
 *             name: "ACME Inc."
 *             address: "123 The Great Plains"
 *             city: "Turbulence Heights"
 *             postCode: "MN 3456"
 *             email: "hello@acmeinc.com"
 *             phone: "+48876654432"
 *             vat: "PL9878767655"
 *             status: "active"
 *             companyType: "lead"
 *             contactMethods: ["email","phone"]
 *             brokerId: "userID"
 *     responses:
 *       201:
 *         description: Company created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Bad request"}
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Company not found"}
 */

router.post("/add", async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      postCode,
      email,
      phone,
      vat,
      status,
      companyType,
      contactMethods,
      brokerId,
    } = req.body;
    const company = new Company({
      name: name,
      address: address,
      city: city,
      postCode: postCode,
      email: email,
      phone: phone,
      vat: vat,
      status: status,
      companyType: companyType,
      contactMethods: contactMethods,
      brokerId: brokerId,
    });
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/** @openapi
 * /api/company/patch/{id}:
 *   patch:
 *     summary: Update company data
 *     tags: [Company]
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
 *             $ref: '#/components/schemas/Company'
 *           example:
 *             name: "ACME Inc"
 *             address: "13 Main Street"
 *             city: "Warsaw"
 *             postCode: "00-950"
 *             email: "ashoka@gmail.com"
 *             phone: "+48654543432"
 *             vat: "PL8767656543"
 *             status: "active"
 *             companyType: "lead"
 *             contactMethods: {tags: ["email", "phone"]}
 *             brokerId: "userID"
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

router.patch("/patch/:id", getCompanyByID, async (req, res) => {
  if (req.body.name != null) {
    res.company.name = req.body.name;
  }
  if (req.body.address != null) {
    res.company.address = req.body.address;
  }
  if (req.body.city != null) {
    res.company.city = req.body.city;
  }
  if (req.body.postCode != null) {
    res.company.postCode = req.body.postCode;
  }
  if (req.body.email != null) {
    res.company.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.company.phone = req.body.phone;
  }
  if (req.body.vat != null) {
    res.company.vat = req.body.vat;
  }
  if (req.body.status != null) {
    res.company.status = req.body.status;
  }
  if (req.body.companyType != null) {
    res.company.companyType = req.body.companyType;
  }
  if (req.body.contactMethods != null) {
    res.company.contactMethods = req.body.contactMethods;
  }
  if (req.body.brokerId != null) {
    res.company.brokerId = req.body.brokerId;
  }
  try {
    const updatedCompany = await res.company.save();
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @openapi
 * /api/company/delete/{id}:
 *  delete:
 *     summary: Delete company by ID
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Company deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Company ID: 69c4f9090d2bbde75227de75 deleted"}
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Bad request"}
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {message: "Company not found"}
 */

router.delete("/delete/:id", getCompanyByID, async (req, res) => {
  try {
    await res.company.deleteOne();
    res.json({ message: `Company ID: ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
