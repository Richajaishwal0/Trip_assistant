const express = require('express');
const router = express.Router();
const {
  login,
  register,
  updateuser,
  Deleteuser,
  getProfile,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validation');
const {
  loginSchema,
  registerSchema,
  updateUserSchema,
  deleteUserSchema,
} = require("../validators/userValidators");

// Auth routes with validation
router.post('/login', validate(loginSchema), login);
router.post('/signup', validate(registerSchema), register);
// router.get("/verifyToken" , VerifyToken);

// Protected routes with validation
router.get('/', authMiddleware, getProfile);
router.patch('/update/', authMiddleware, validate(updateUserSchema), updateuser);
router.delete(
  '/delete/',
  authMiddleware,
  validate(deleteUserSchema),
  Deleteuser
);

module.exports = router;
