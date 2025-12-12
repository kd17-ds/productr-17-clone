const { Schema, model } = require("mongoose");

const otpSchema = new Schema(
  {
    identifier: {
      type: String,
      required: true,
      index: true,
    },

    codeHash: {
      type: String,
      required: true,
    },

    txId: {
      type: String,
      index: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    used: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Otp", otpSchema);
