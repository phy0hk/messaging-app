const crypto = require('crypto');
const bcrypt = require('bcrypt');
const pool = require('../db');
const { sendPasswordResetEmail } = require('../utils');
const { send } = require('process');
const { reset } = require('nodemon');
const { join } = require('path');

const saltRounds = 10;

const requestPasswordReset = async(req, res) => {
    const { email } = req.body;

    try {
        const fetchedUser = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if(fetchedUser.rows.length === 0) {
            return res.status(404).json({ message: 'No user found with this email.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const hashedToken = await bcrypt.hash(token, saltRounds);
        const expiresAt = new Date(Date.now() * 60 * 60 * 1000);

        await pool.query(
            'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3',
            [hashedToken, expiresAt, email]
        );

        // send the email
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;
        await sendPasswordResetEmail(email, resetLink);

        res.status(200).json({ message: 'Password reset link has been sent to your email.' });
    } catch(err) {
        console.error('Error in requesting requestPasswordReset', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const resetPassword = async(req, res) => {
    const { token, newPassword, email } = req.body;

    try {
        const fetchedUser = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND reset_token_expires > NOW()',
            [email]
        );

        if(fetchedUser.rows.length === 0) {
            return res.status(404).json({ message: 'Invalid or expired token.' });
        }

        const user = fetchedUser.rows[0];
        const isTokenValid = await bcrypt.compare(token, user.reset_token);

        if(!isTokenValid) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await pool.query(
            'UPDATE users SET password = $1, reset_token = NULL, reset_token_exipres = NULL WHERE id = $2',
            [hashedPassword, user.id]
        );

        res.status(200).json({ message: 'Password reset successful.' });
    } catch(err) {
        console.error('Error resetting password: ', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { requestPasswordReset, resetPassword };