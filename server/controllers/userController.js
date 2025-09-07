const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { handleServerError, sendSuccess } = require("../utils/errorHandler");

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email using MongoDB
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Secure password comparison using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT token - Fail if no secret is provided for security
    if (!process.env.JWT_SECRET) {
      console.error(
        "❌ SECURITY ERROR: JWT_SECRET environment variable is not set"
      );
      return res.status(500).json({
        success: false,
        message: "Server configuration error. Please contact administrator.",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Return user data without password
    const userData = {
      id: user._id,
      email: user.email,
      user_name: user.user_name,
      mobile_no: user.mobile_no,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return sendSuccess(res, { user: userData, token }, "Login successful");
  } catch (error) {
    console.log(error);
    // return handleServerError(error, "Login error", res);
  }
};

// Register controller
const register = async (req, res) => {
  try {
    const { user_name, email, password, mobile_no } = req.body;

    if (!user_name || !email || !password || !mobile_no) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email already exists using MongoDB
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash the password securely before storing
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user with MongoDB
    const user = await User.create({
      user_name,
      email,
      password: hashedPassword,
      mobile_no,
    });

    // Create JWT token - Fail if no secret is provided for security
    if (!process.env.JWT_SECRET) {
      console.error(
        "❌ SECURITY ERROR: JWT_SECRET environment variable is not set"
      );
      return res.status(500).json({
        success: false,
        message: "Server configuration error. Please contact administrator.",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Return user data without password
    const userData = {
      id: user._id,
      email: user.email,
      user_name: user.user_name,
      mobile_no: user.mobile_no,
    };

    return sendSuccess(
      res,
      { user: userData, token },
      "User registered successfully"
    );
  } catch (error) {
    return handleServerError(error, "Registration error", res);
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return sendSuccess(res, { user });
  } catch (error) {
    return handleServerError(error, "Get profile error", res);
  }
};
//update user;
const updateuser = async (req, res) => {
  try {
    const id = req.user.userId;

    const { user_name, email, mobile_no } = req.body;

    if (!(user_name || email || mobile_no)) {
      return res.status(400).json({
        success: false,
        message: "fill at least one of them",
      });
    }

    const Obj = {};

    if (user_name) Obj.user_name = user_name;
    if (email) Obj.email = email;
    if (mobile_no) Obj.mobile_no = mobile_no;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: Obj },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "could not be updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// it is for delete user
const Deleteuser = async (req, res) => {
  try {
    const id = req.user.userId;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not founded",
      });
    }
    res.status(200).json({
      success: true,
      message: "user remove succefully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  login,
  register,
  getProfile,
  updateuser,
  Deleteuser,
};
