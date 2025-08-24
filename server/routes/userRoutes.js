const express = require('express');
const router = express.Router();
const { login, register,updateuser,Deleteuser} = require('../controllers/userController');
const authMiddleware=require('../middleware/auth')
// Auth routes
router.post('/login', login);
router.post('/signup', register);


router.patch("/update/",authMiddleware,updateuser);
router.delete("/delete/",authMiddleware,Deleteuser);
module.exports = router;
