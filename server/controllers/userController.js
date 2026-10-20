import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Car from "../models/Car.js";

// Generate jwt token
const generateToken = (userId) => {
  const payload = userId;
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({
        message:
          "Please provide all required fields and ensure password is at least 8 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const token = generateToken(user._id.toString());
    res
      .status(200)
      .json({ success: true, message: "User logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//get user Data using token
export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all cars from frontend
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvailable: true });
    res.json({ success: true, cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
