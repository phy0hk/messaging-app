const { response } = require('express');
const pool = require('../db');

// View profile
const viewProfile = async(req, res) => {
    try {
        const userId = req.user.id;

        const fetchedId = await pool.query(
            'SELECT username, email, created_at FROM users WHERE id = $1',
            [userId]
        );
        if(fetchedId.rows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ user: fetchedId.rows[0] });
    } catch(err) {
        console.error('Error fetching profile: ', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Update profile
const updateProfile = async(req, res) => {
    const { username, email } = req.body;

    try {
        const userId = req.user.id;

        const fetchedResultl = await pool.query(
            'UPDATE users SET username = $1, email = $2, WHERE id = $3 RETURNING username, email',
            [username, email, userId]
        );
        if(fetchedResultl === 0) {
            return res.staus(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Profile updated successfully.' , user: fetchedResultl.rows[0]});
    } catch(err) {
        console.error('Error updating profile: ', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Delete user account
const deleteProfile = async(req, res) => {
    try {
        const userId = req.user.id;

        const fetchedId = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING id',
            [userId]
        );
        if(fetchedId.rows.length === 0) {
            return res.status(404).json({ message: 'Account deleted successfully.' });
        }

        res.status(200).json({ message: 'Accound deleted successfully.' });
    } catch(err) {
        console.error('Error deleteding profile: ', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { viewProfile, updateProfile, deleteProfile };