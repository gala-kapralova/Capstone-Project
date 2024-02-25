const express = require('express');
const cors = require('cors');
require('dotenv').config();

const upload = require('./routes/upload');
const statistics = require('./routes/statistics');
const quality = require('./routes/quality');

const app = express();
app.use(express.json());
app.use(cors());

app.use(upload);
app.use(statistics);
app.use(quality);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));