const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

// Middleware for chekcing for valid JWT
const authenticateUser = (req, res) => {
    const token = req.header('Authorization')?.eplace('Bearer ', '');

    if(!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch(err) {
        console.error('Invalid token: ', err);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateUser;