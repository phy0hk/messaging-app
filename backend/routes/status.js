const express = require('express');
const { getUserStatus } = require('../controllers/statusController');

const router = express.Router();

router.get('/:userId/status', getUserStatus);

module.exports = router;