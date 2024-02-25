const fs = require('fs');
const csvParser = require('csv-parser');
const multer = require('multer');
const uploadFile = multer({ dest: 'uploads/' });
const uuid = require('uuid');

let datasets = {}; 

exports.upload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('error', (error) => {
      console.error('Error parsing CSV:', error);
      return res.status(500).json({ error: 'Failed to parse CSV file.' });
    })
    .on('end', () => {
      fs.unlink(req.file.path, (err) => { 
        if (err) console.error('Error deleting file:', err);
      });
      const datasetId = uuid.v4();
      datasets[datasetId] = results;
      res.json({ datasetId, rows: results.slice(0, 100) });
    });
};
