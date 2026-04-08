const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;

const baseOptions = { timestamps: true };

/**
 * @openapi
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         permissions:
 *           type: string
 *           enum:
 *             - company:read
 *             - company:write
 *             - company:delete
 *             - pipeline:read
 *             - pipeline:write
 *             - pipeline:delete
 *             - user:read
 *             - user:write
 *             - user:delete
 *         importance:
 *           type: number
 *       example:
 *         _id: "64b8c9f1e1b2c3d4e5f67890"
 *         name: "admin"
 *         permissions: ["company:read", "company:write", "company:delete", "pipeline:read", "pipeline:write", "pipeline:delete", "user:read", "user:write", "user:delete"]
 */

const RoleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    permissions: [
      {
        type: String,
        enum: [
          "company:read",
          "company:write",
          "company:delete",
          "pipeline:read",
          "pipeline:write",
          "pipeline:delete",
          "user:read",
          "user:write",
          "user:delete",
        ],
        required: true,
      },
    ],
    importance: { type: Number, required: true },
  },
  baseOptions,
);

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
