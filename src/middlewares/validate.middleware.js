const { body, validationResult } = require("express-validator");

const validateMiddleware = [
  body("text").isString().isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      });
    }
    next();
  }
];

module.exports = validateMiddleware;