const { verifyToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  try {
    /**
     * SESSION AUTH
     */
    if (req.session?.user) {
      req.user = req.session.user;
      return next();
    }

    /**
     * JWT AUTH
     */
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      const decoded = verifyToken(token);

      req.user = decoded;

      return next();
    }

    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid auth"
    });
  }
};

module.exports = authMiddleware;