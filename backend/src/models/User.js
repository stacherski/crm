const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;

const baseOptions = { timestamps: true };

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "editor"] },
    status: { type: String, enum: ["active", "inactive", "locked"] },
    lastLogin: { type: Date }
  },
  baseOptions,
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
