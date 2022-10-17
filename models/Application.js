const mongoose = require('mongoose');
const { Schema } = mongoose;

const Application = new Schema({
        userID: Object,
        jobTitle: String,
        
        company: {
                companyName: String,
                contactPerson: { 
                        firstName: String,
                        lastName: String,
                        gender: String
                },
                address: {
                        postCode: String,
                        street: String,
                        city: String,
                        email: String,
                        phone: [ String ]
                }
        },
        resume: {
                name: String,
                url: String
        },
        motivation: {
                name: String,
                url: String
        },
        certificates: [
                {
                name: String,
                url: String
        }],
        
        date: Date
        
});

module.exports = mongoose.model('applications', Application);
