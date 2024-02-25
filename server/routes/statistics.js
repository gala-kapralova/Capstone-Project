const express = require('express');
const router = express.Router();
const { statistics } = require('../controllers/statistics');

router.post('/statistics', statistics);

module.exports = router;