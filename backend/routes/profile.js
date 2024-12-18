const express = require('express');
const { viewProfile, updateProfile, deleteProfile } = require('../controllers/profileController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// View profile
router.get('/profile', authenticateUser, viewProfile);

// Update profile
router.put('/profile', authenticateUser, updateProfile);

// Delele profile
router.detete('/profile', authenticateUser, deleteProfile);

module.exports = router;