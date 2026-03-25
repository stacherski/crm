const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;

const User = require("../models/User");
const Pipeline = require("../models/Pipeline");
const Contact = require("../models/Contact");

const baseOptions = { timestamps: true };
/**
 * @openapi
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         postCode:
 *           type: string
 *         phone:
 *           type: string
 *         vat:
 *           type: string
 *         status:
 *           type: string
 *         companyType:
 *           type: string
 *         contactMethods:
 *           type: array
 *           items:
 *             type: string
 *         brokerId:
 *           type: string
 *         tenantId:
 *           type: string
 *         email:
 *           type: string
 */
const CompanySchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    vat: { type: String },
    status: { type: String, enum: ["active", "inactive"], required: true },
    companyType: {
      type: String,
      enum: ["lead", "prospect", "client"],
      required: true,
    },
    contactMethods: [
      { type: String, enum: ["email", "phone", "sms", "other"] },
    ],
    brokerId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tenantId: { type: Types.ObjectId, required: true, index: true },
  },
  baseOptions,
);

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
