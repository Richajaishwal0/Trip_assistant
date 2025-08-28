// 1. IMPORT THE VALIDATION RESULT FUNCTION
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  // 2. CHECK FOR VALIDATION ERRORS
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are errors, send them back to the frontend
    return res.status(400).json({ errors: errors.array() });
  }

  // The rest of your existing registration logic continues from here...
  const { username, email, password } = req.body;

  try {
    // ...existing code to check if user exists, hash password, and save user
  } catch (err) {
    // ...existing error handling
  }
};

// The 'login' function does not need changes for this bug
export const login = async (req, res) => {
  // ...
};