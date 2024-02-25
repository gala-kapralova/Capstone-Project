const express = require('express');
const router = express.Router();
const { calculateData } = require('../controllers/quality');

router.post('/quality', calculateData);

module.exports = router;