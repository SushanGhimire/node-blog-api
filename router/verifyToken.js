const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Token is not valid",
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Token not provided",
    });
  }
};

module.exports = {
  verifyToken: verifyToken,
};
