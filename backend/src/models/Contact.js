const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;

const baseOptions = { timestamps: true };

const CompanyContactSchema = new Schema(
  {
    companyId: {
      type: Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    tags: [{ type: String }],
    tenantId: { type: Types.ObjectId, required: true, index: true },
  },
  baseOptions,
);

const CompanyContact = mongoose.model("CompanyContact", CompanyContactSchema);

module.exports = CompanyContact;
