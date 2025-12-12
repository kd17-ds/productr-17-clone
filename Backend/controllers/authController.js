const User = require("../models/UserModel");
const Otp = require("../models/OtpModel");
const {
  normalizePhone,
  normalizeEmail,
  generateNumericOtp,
  hashOtp,
  makeTxId,
  ttlDate,
  compareOtpHash,
} = require("../utils/authHelpers");
const { sendEmail } = require("../utils/sendEmail");
const RESEND_COOLDOWN = process.env.OTP_RESEND_COOLDOWN_SECONDS;
const { createSecretToken } = require("../utils/secretToken");
const OTP_MAX_ATTEMPTS = process.env.OTP_MAX_ATTEMPTS;

module.exports.requestOtp = async (req, res) => {
  try {
    const { identifier } = req.body;
    if (!identifier)
      return res.status(400).json({ ok: false, error: "identifier required" });

    const phone = normalizePhone(identifier);
    const email = normalizeEmail(identifier);
    if (!phone && !email) {
      return res
        .status(400)
        .json({ ok: false, error: "identifier must be valid phone or email" });
    }
    const normalized = phone || email;

    const recent = await Otp.findOne({
      identifier: normalized,
      used: false,
    }).sort({ createdAt: -1 });
    if (recent) {
      const since = (Date.now() - recent.createdAt.getTime()) / 1000;
      if (since < RESEND_COOLDOWN) {
        return res.status(429).json({
          ok: false,
          error: `Wait ${Math.ceil(
            RESEND_COOLDOWN - since
          )}s before requesting new OTP`,
        });
      }
    }

    const plainOtp = generateNumericOtp();
    const codeHash = await hashOtp(plainOtp);
    const txId = makeTxId();
    const expiresAt = ttlDate();

    await Otp.updateMany(
      { identifier: normalized, used: false },
      { $set: { used: true } }
    );

    await Otp.create({
      identifier: normalized,
      codeHash,
      txId,
      expiresAt,
      attempts: 0,
      used: false,
    });

    const message = `Your verification code is ${plainOtp}. It expires in ${Math.floor(
      (expiresAt - Date.now()) / 60000
    )} minutes.`;
    if (phone) {
      await sendSms(phone, message);
    } else {
      await sendEmail(
        normalized,
        "Your verification code",
        `<p>Your OTP is <b>${plainOtp}</b></p>`
      );
    }

    return res.json({ ok: true, message: "OTP sent", txId });
  } catch (err) {
    console.error("request-otp error:", err);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const { identifier, otp, txId } = req.body;

    if (!identifier || !otp) {
      return res
        .status(400)
        .json({ ok: false, error: "identifier and otp required" });
    }

    const phone = normalizePhone(identifier);
    const email = normalizeEmail(identifier);

    if (!phone && !email) {
      return res
        .status(400)
        .json({ ok: false, error: "Invalid phone or email" });
    }

    const normalized = phone || email;

    const query = { identifier: normalized, used: false };
    if (txId) query.txId = txId;

    const otpDoc = await Otp.findOne(query).sort({ createdAt: -1 });

    if (!otpDoc) {
      return res.status(400).json({ ok: false, error: "No valid OTP found" });
    }

    if (otpDoc.expiresAt < new Date()) {
      otpDoc.used = true;
      await otpDoc.save();
      return res.status(400).json({ ok: false, error: "OTP expired" });
    }

    if (otpDoc.attempts >= OTP_MAX_ATTEMPTS) {
      otpDoc.used = true;
      await otpDoc.save();
      return res.status(429).json({ ok: false, error: "Too many attempts" });
    }

    const match = await compareOtpHash(otp, otpDoc.codeHash);

    if (!match) {
      otpDoc.attempts += 1;
      await otpDoc.save();

      const left = OTP_MAX_ATTEMPTS - otpDoc.attempts;
      return res
        .status(400)
        .json({ ok: false, error: `Invalid OTP. ${left} attempts left.` });
    }

    otpDoc.used = true;
    await otpDoc.save();

    let user = await User.findOne({
      $or: [{ phone: phone || null }, { email: email || null }],
    });

    if (!user) {
      user = await User.create({
        phone: phone || null,
        email: email || null,
        isVerified: true,
      });
    } else if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    const token = createSecretToken(user._id);
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      ok: true,
      message: "OTP verified",
      user: {
        id: user._id,
        phone: user.phone,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error("verify-otp error:", err);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
};
