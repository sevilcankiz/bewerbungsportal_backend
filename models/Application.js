const mongoose = require('mongoose');
const { Schema } = mongoose;

const Application = new Schema({
        userID: Object,
        jobTitle: String,       
        company: {
                companyName: String,
                contactPerson: { 
                        fullName: String,
                        gender: String
                },
                address: {
                        postCode: String,
                        street: String,
                        city: String,
                        email: String,
                        phone: String,
                        website: String
                }
        },
        motivation: {
                motName: String,
                motURL: String
        },
        resumeID: Object,
        certificates: [ {certID: Object} ],
        date: {type: Date, default: Date.now}       
});

module.exports = mongoose.model('applications', Application);
