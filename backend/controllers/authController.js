const bcrypt = require('bcrypt');
const pool = require('../db');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');

// Register

// Register schema
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required()
});

const register = async(req, res) => {
    const { username, email, password } = req.body;

    try {
        // Validating input
        const { error } = registerSchema.validate({ username, email, password });
        if(error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Check if email already exists.
        const isUserExit = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if(isUserExit.rows.length > 0) {
            return res.status(409).json({ message: 'Email is already registered.' });
        }

        // Hashing the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Inserting the new user into the database
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        // Response with success
        res.status(201).json({ message: 'User registered successfull.', user: newUser.rows[0] });
    } catch(err) {
        console.error('Registeration error: ', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Login
const login = async(req, res) => {
    const { email, password } = req.body;

    try {

        //Check if user is valid
        const fetchedUserResult = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if(fetchedUserResult.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = fetchedUserResult.rows[0];

        //Check if password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch(err) {
        console.error('Login error: ', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { register, login };