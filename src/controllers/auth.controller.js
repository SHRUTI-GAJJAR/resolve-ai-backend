const { registerUser, loginUser, getCurrentUser } = require("../services/auth.service");
const { generateToken } = require("../utils/jwt");


const registerController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      data: user
    });

  } catch (error) {
    next(error);
  }
};
const loginController = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);

    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email
    };

    res.status(200).json({
      message: "Login successful"
    });

  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    req.session.destroy(() => {
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    next(error);
  }
};

const getMeController = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.id);

    res.status(200).json({
      data: user
    });

  } catch (error) {
    next(error);
  }
};


const googleCallbackController = (req, res) => {
  const user = req.user;

  const token = generateToken(user._id);

  res.status(200).json({
    message: "Google login successful",
    token
  });
};

const githubCallbackController = (req, res) => {
  const user = req.user;

  const token = generateToken(user._id);

  res.status(200).json({
    message: "GitHub login successful",
    token
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController, 
  getMeController,
  googleCallbackController,
  githubCallbackController
};