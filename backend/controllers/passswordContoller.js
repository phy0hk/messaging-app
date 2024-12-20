const crypto = require('crypto');
const bcrypt = require('bcrypt');
const pool = require('../db');
const { sendPasswordResetEmail } = require('../utils');

const saltRounds = 10;
