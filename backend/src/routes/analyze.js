const express = require('express');
const multer = require('multer');
const analyzeController = require('../controllers/analyzeController');

const router = express.Router();

// Multer config for PDF uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  // THE CHANGE IS HERE: The limit is now 20
  limits: { files: 20 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
});

router.post('/', upload.array('files', 20), analyzeController.handleAnalyze);

module.exports = router;