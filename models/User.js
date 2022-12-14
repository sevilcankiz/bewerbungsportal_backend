const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: { type: String, required: [true, 'Password is required'], select: false },
    address: {
        postCode: String,
        street: String,
        city: String,
        email: String,
        phone: [ String ]
    },  
    certificates: [{
        certName: String,
        certURL: String
    }],
    resumes: [{
        resName: String,
        resURL: String
    }],
});

module.exports = mongoose.model('User', userSchema);
