const mongoose = require("mongoose");

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
 *         role:
 *           type: string
 *           enum:
 *             - admin
 *             - user
 *             - editor
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *             - locked
 *         lastLogin:
 *           type: string
 */

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "editor"] },
    status: { type: String, enum: ["active", "inactive", "locked"] },
    lastLogin: { type: Date },
  },
  baseOptions,
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
