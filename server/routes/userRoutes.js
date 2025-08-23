const express = require('express');
const router = express.Router();
const { login, register , VerifyToken } = require('../controllers/userController');

// Auth routes
router.post('/login', login);
router.post('/signup', register);
router.get("/verifyToken" , VerifyToken);

module.exports = router;
