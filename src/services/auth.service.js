const User = require("../models/user.model");
const { hashPassword , comparePassword } = require("../utils/hash");
const { sendMail } = require("../config/mail");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    provider: "local"
  });

  try {
    await sendMail(
      email,
      "Welcome to ResolveAI",
      `Hello ${name}, welcome to ResolveAI 🚀`
    );
  } catch (error) {
    console.log("EMAIL ERROR:", error.message);
  }

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !user.password) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  return user;
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return user;
};

module.exports = { registerUser, loginUser, getCurrentUser };