const express = require('express');
const router = express.Router();
const { upload } = require('../controllers/upload');
const multer = require('multer');
const uploadFile = multer({ dest: 'uploads/' });

router.post('/upload', uploadFile.single('file'), upload);

module.exports = router;