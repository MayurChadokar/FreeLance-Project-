const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const dbconnect = require('./config/dbconfig');  
const user = require('./routes/user'); 
const Satsang = require('./routes/Satsang');
cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

dbconnect();

app.use('/api/rssb/', user);
app.use('/api/rssb/', Satsang);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("this the protect dashboard server for the rssb");

}
);
