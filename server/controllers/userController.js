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
    console.log(user)

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

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-default-secret-key",
      { expiresIn: "1d" }
    );

    // Return user data without password
    const userData = {
      id: user._id,
      email: user.email,
      user_name: user.user_name,
      mobile_no: user.mobile_no,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return sendSuccess(res, {...userData , token} , "Login successful");
  } catch (error) {
    console.log(error)
    // return handleServerError(error, "Login error", res);
  }
};

// Register controller
const register = async (req, res) => {
  try {
    const {
      userName : user_name,
      email,
      mobileNo : mobile_no,
      password
    } = req.body;

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

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-default-secret-key",
      { expiresIn: "1d" }
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

const VerifyToken = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Expecting 'Bearer <token>'
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET || 'your-default-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    } 
    return res.status(200).json({ success: true, message: 'Token is valid', user: decoded });
  });
};

module.exports = {
  login,
  register,
  getProfile,
  VerifyToken
};
