const mongoose = require("mongoose");

const Role = require("../models/Role");
const { Schema, model, Types } = mongoose;

const baseOptions = { timestamps: true };

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         passwordHash:
 *           type: string
 *         roleId:
 *           type: string
 *         role:
 *           type: string
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *             - locked
 *         lastLogin:
 *           type: string
 *     UserCreated:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         passwordHash:
 *           type: string
 *         roleId:
 *           type: string
 *         role:
 *           type: string
 *        permissions:
 *          type: array
 *          items:
 *             type: string
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *             - locked
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         __v:
 *           type: number
 *
 */

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    roleId: {
      type: Types.ObjectId,
      ref: "Role",
      required: true,
      index: true,
    },
    role: { type: String, required: false },
    permissions: [{ type: String, required: false }],
    status: { type: String, enum: ["active", "inactive", "locked"] },
    lastLogin: { type: Date },
  },
  baseOptions,
);

UserSchema.pre("save", async function () {
  if (!this.isModified("roleId")) return
  const role = await mongoose.model("Role").findById(this.roleId)
  this.role = role.name
  this.permissions = role.permissions
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
