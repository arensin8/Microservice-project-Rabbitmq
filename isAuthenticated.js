const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers?.["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, "secretKey", (err, payload) => {
      if (err) {
        return res.status(401).json({ error: "Token is invalid or expired" });
      }
      req.user = payload;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  isAuthenticated,
};
