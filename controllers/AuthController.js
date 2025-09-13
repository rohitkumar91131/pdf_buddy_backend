import dotenv from 'dotenv'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

dotenv.config();

const SECRET = process.env.JWT_SECRET; 
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 1000 * 60 * 60 * 24 * 7, 
};

export const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
      status: 400,
    });
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
      status: 400,
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id }, 
      SECRET, 
      { expiresIn: "7d" }
    );
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      status: 201,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      status: 500,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
      status: 400,
    });
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
      status: 400,
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        status: 401,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        status: 401,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      SECRET, 
      { expiresIn: "7d" }
    );
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      status: 500,
    });
  }
};

export const verified = (req, res) => {
  return res.status(200).json({
    success: true,
    msg: "Welcome back",
    status: 200,
  });
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", COOKIE_OPTIONS);
    return res.status(200).json({
      success: true,
      msg: "Logout Successful",
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
      status: 500,
    });
  }
};
