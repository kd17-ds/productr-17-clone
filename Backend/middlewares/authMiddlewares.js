const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ ok: false, error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    req.userId = decoded.id;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res
      .status(401)
      .json({ ok: false, error: "Invalid or expired token" });
  }
};
