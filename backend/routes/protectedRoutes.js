const express = require('express');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Just example, will change when front end done

router.get('/profile', authenticateUser, (req, res) => {
    res.json({ message: 'Welcome to your profile', user: req.user });
});

module.exports = router;