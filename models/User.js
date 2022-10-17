const mongoose = require('mongoose');
const { Schema } = mongoose;

const Address = new Schema({
    postCode: String,
    street: String,
    city: String,
    email: String,
    phone: [ String ]
});

const User = new Schema({
    firstName: String,
    lastName: String,
    address: Address,  
    certificates: [{
        name: String,
        url: String
    }],
    resumes: [{
        name: String,
        url: String
    }],
});

//module.exports = mongoose.model('addresses', Address);
module.exports = mongoose.model('users', User);
