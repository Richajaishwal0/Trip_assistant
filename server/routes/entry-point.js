// routes/entry-point.js
const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/userController");
const validate = require('../middleware/validation');
const { loginSchema, registerSchema } = require('../validators/userValidators');

// Use secure authentication controllers with validation
router.post("/signup", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
