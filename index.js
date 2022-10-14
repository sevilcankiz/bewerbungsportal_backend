require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const PORT = process.env.PORT || 8080;

const applicationsRouter = require('./routes/applications');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

db();

app.get('/', (req, res) => {
    res.send('server runs on port' + PORT);
});

app.use('/applications', applicationsRouter);



app.listen(PORT, () => console.log('server is listening'));