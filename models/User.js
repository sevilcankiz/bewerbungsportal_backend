const mongoose = require('mongoose');
const { Schema } = mongoose;

const Address = new Schema({
    postCode: String,
    street: String,
    city: String,
    email: String,
    phone: [ String ]
});

const Certificate = new Schema({
    certName: String,
    certURL: String
});

const Resume = new Schema({
    resName: String,
    resURL: String
});

const User = new Schema({
    firstName: String,
    lastName: String,
    address: Address,  
    certificates: [Certificate],
    resumes: [Resume],
});


module.exports = mongoose.model('users', User);
