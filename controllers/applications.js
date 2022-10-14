const aplicationRouter = require('../routes/applications');
const Application = require('../models/Application');

//Alles anzeigen
const getAllApplications = async(req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports=getAllApplications;