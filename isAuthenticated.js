const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers?.["authentication"]?.split(" ")[1];
    jwt.verify(token, "secretKey", (err, payload) => {
      if (err) return { error: err };
      req.user = payload;
      next();
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = {
  isAuthenticated,
};
