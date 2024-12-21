const pool = require('../db');
const { requestPasswordReset } = require('./passswordContoller');

// Search a user
const searchUsers = async(req, res) => {
    const { query } = req.query;

    try {
        const fetchedResult = await pool.query(
            'SELECT id, username, email FROM users WHERE username ILIKE $1 OR email ILIKE $1',
            [`${query}`]
        );
        res.status(200).json({ user: fetchedResult.rows });
    } catch(err) {
        console.error('Error searching users: ', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Sending a friend request
const sendFriendRequest = async(req, res) => {
    const { recipientId } = req.body;
    const requesterId = req.user.id;

    // checking if friendship exists
    try {
        const isExistRequest = await pool.query(
            'SELECT * FROM friendships WHERE (requester_id = $1 AND recipient_id = $2) )R (recipient_id = $1 AND requester_id = $2)',
            [requesterId, recipientId]
        );
        if(isExistRequest.rows.length > 0) {
            return res.status(400).json({ message: 'Friendship already exists.' });
        }

        // if not then
        await pool.query(
            'INSERT INTO friendship (requester_id, recipient_id, status)',
            [requesterId, recipientId, 'pending']
        );

        res.status(201).json({ message: 'Friend request has been sent!' });
    } catch(err) {
        console.error('Error sending friend request: ', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Responding to a friend request
const respondToFriendRequest = async(req, res) => {
    const { requesterId, status } = req.body;
    const userId = req.user.id;

    try {
        await pool.query(
            'UPDATE friendships SET status $1, updated_at = NOW() WHERE id = $2 AND recipient_id = $3',
            [status, requesterId, userId]
        );

        res.status(200).json({ message: `Friend request is ${status}.` });
    } catch(err) {
        console.error('Error responding to friend: ', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Friend list
const getFriendsList = async(req, res) => {
    const userId = req.user.id;

    try {
        const friends = await pool.query(
            `SELECT user.id, user.username, user.email
            FROM user
            JOIN friendships  ON (user.id = friendships.requester_id OR user.id = recipient_id)
            WHERE (friendships.requester_id = $1 OR friendships.recipient_id = $1) AND friendships.status = 'accepted' AND user.id != $1;`,
            [userId]
        );

        res.status(200).json({ friends: friends.rows });
    } catch(err) {
        console.error('Error fetching friends list: ', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    searchUsers,
    sendFriendRequest,
    respondToFriendRequest,
    getFriendsList
};