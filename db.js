const mongoose = require('mongoose');
const db = async(req, res) => {
    try {
        const URI = process.env.MONGO_DB;
        mongoose.connect(URI);
        console.log('mongoDB connected');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('no connection to mongoDB');
    }
};

module.exports = db;