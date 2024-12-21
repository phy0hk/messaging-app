const express = require('express');
const {
    searchUsers,
    sendFriendRequest,
    respondToFriendRequest,
    getFriendsList
} = require('../controllers/friendController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Search for users by username
router.get('/search', authenticateUser, searchUsers);

// Send a friend request
router.post('/request', authenticateUser, sendFriendRequest);

// Respond to a friend request
router.post('/respond', authenticateUser, respondToFriendRequest);

// Get friend list
router.get('/list', authenticateUser, getFriendsList);

module.exports = router;