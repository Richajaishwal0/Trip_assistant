import express from 'express';
// 1. IMPORT THE VALIDATOR
import { body } from 'express-validator'; 

import { login, register } from '../controllers/user.js';

const router = express.Router();

// 2. ADD THE VALIDATION RULES TO THE REGISTER ROUTE
router.post(
  '/register',
  [
    body('username', 'Username cannot be empty').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  register
); // The 'register' function will only run if validation passes

router.post('/login', login);

export default router;