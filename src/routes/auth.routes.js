const express = require("express");

const {
  registerController,
  loginController,
  logoutController,
  getMeController,
  googleCallbackController,
  githubCallbackController
} = require("../controllers/auth.controller");

const passport = require("../config/passport");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/github:
 *   get:
 *     summary: Login with GitHub
 *     description: Redirect user to GitHub OAuth login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirect to GitHub
 */
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

/**
 * @swagger
 * /api/auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     description: GitHub redirects user here after successful login
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: GitHub login successful
 *       401:
 *         description: Authentication failed
 */
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  githubCallbackController
);

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Login with Google
 *     description: Redirect user to Google OAuth login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirect to Google
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Google redirects user here after successful login
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Google login successful
 *       401:
 *         description: Authentication failed
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallbackController
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     description: Create a new account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Shruti
 *               email:
 *                 type: string
 *                 example: shruti@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/register", registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Login user and return JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: shruti@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginController);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logout current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", logoutController);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get logged in user
 *     description: Fetch current authenticated user details
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/me", authMiddleware, getMeController);

module.exports = router;