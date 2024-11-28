const express = require('express');
const cors = require('cors');
require('dotenv').config();

const upload = require('./routes/upload');
const statistics = require('./routes/statistics');
const quality = require('./routes/quality');

const app = express();
app.use(express.json());
const allowedOrigins = [
    'https://data-kapellmeister.netlify.app/',
    'http://localhost:3000' 
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

app.use(upload);
app.use(statistics);
app.use(quality);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));