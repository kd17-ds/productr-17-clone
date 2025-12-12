const bcrypt = require("bcrypt");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

const OTP_LENGTH = process.env.OTP_LENGTH;
const OTP_TTL_SECONDS = process.env.OTP_TTL_SECONDS;
const SALT_ROUNDS = process.env.OTP_HASH_SALT_ROUNDS;

function normalizePhone(input, defaultCountry = "IN") {
  if (!input) return null;
  try {
    let pn = parsePhoneNumberFromString(input); // with country code
    if (!pn) pn = parsePhoneNumberFromString(input, defaultCountry); // without country code
    if (!pn || !pn.isValid()) return null;
    return pn.number;
  } catch (e) {
    return null;
  }
}

function normalizeEmail(email) {
  if (!email || typeof email !== "string") return null;
  const e = email.trim().toLowerCase();
  return validator.isEmail(e) ? e : null;
}

function generateNumericOtp(length = OTP_LENGTH) {
  const max = 10 ** length;
  const n = Math.floor(Math.random() * max)
    .toString()
    .padStart(length, "0"); // leading zeros
  return n;
}

async function hashOtp(plainOtp) {
  return bcrypt.hash(plainOtp, SALT_ROUNDS);
}

async function compareOtpHash(plainOtp, hash) {
  return bcrypt.compare(plainOtp, hash);
}

function makeTxId() {
  return uuidv4();
}

function ttlDate(seconds = OTP_TTL_SECONDS) {
  return new Date(Date.now() + seconds * 1000);
}

module.exports = {
  normalizePhone,
  normalizeEmail,
  generateNumericOtp,
  hashOtp,
  compareOtpHash,
  makeTxId,
  ttlDate,
};
