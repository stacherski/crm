const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;

const baseOptions = { timestamps: true };

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
    type: {
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
