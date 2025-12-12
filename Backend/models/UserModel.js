const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, trim: true },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true,
      index: true,
    },

    phone: {
      type: String,
      sparse: true,
      index: true,
    },

    isVerified: { type: Boolean, default: false },

    metadata: {
      lastLoginAt: Date,
      lastIP: String,
      userAgent: String,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
