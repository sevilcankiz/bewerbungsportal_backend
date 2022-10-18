const mongoose = require('mongoose');
const { Schema } = mongoose;

const Address = new Schema({
    postCode: String,
    street: String,
    city: String,
    email: String,
    phone: [ String ]
});


module.exports = mongoose.model('addresses', Address);