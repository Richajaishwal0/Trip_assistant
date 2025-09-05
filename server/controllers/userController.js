import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'Email already registered' }] });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'Username already taken' }] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      msg: 'User registered successfully',
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' }
    );

    res.json({
      msg: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
