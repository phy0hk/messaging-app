const express = require('express');
const {
    register,
    login,
} = require('../controllers/authController');
const {
    requestPasswordReset,
    resetPassword
} = require('../controllers/passswordContoller');

// Create new router
const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Requesting for password reset
router.post('/request-password-reset', requestPasswordReset);

// Reset password
router.post('/reset-password', resetPassword);


module.exports = router;