import express from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/userController.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('username')
      .trim()
      .notEmpty().withMessage('Username cannot be empty')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

    body('email')
      .trim()
      .isEmail().withMessage('Please include a valid email')
      .normalizeEmail(),

    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
      .matches(/[0-9]/).withMessage('Password must contain at least one number')
      .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character (@, $, !, %, *, ?, &)'),    

    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
  ],
  register
);

router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  login
);

export default router;
