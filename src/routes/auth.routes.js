const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  getMeController
} = require("../controllers/auth.controller");

const passport = require("../config/passport");
const authMiddleware = require("../middlewares/auth.middleware");

const { googleCallbackController } = require("../controllers/auth.controller");
const { githubCallbackController } = require("../controllers/auth.controller");

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  githubCallbackController
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallbackController
);

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", authMiddleware, getMeController);



module.exports = router;