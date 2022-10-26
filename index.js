require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const applicationsRouter = require('./routes/applications');
const usersRouter = require('./routes/users');

db();

app.get('/', (req, res) => {
    res.send('server runs on port' + PORT);
});

app.use('/applications', applicationsRouter);
app.use('/users', usersRouter);



app.listen(PORT, () => console.log('server is listening'));