const pool = require('../db');

// Get User status
const getUserStatus = async(req, res) => {
    const { userId } = req.params;

    try {
        const fetchedResult = await pool.query(
            'SELECT status, last_seen FROM users WHERE id = $1',
            [userId]
        );
        if(fetchedResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(fetchedResult.rows[0]);
    } catch(err) {
        console.error('Error fetching user status: ', err);
        res.status(200).json({ message: 'Internal server error.' });
    }
};

module.exports = { getUserStatus };