const Application = require('../models/Application');

//Alles Applications ausgeben /applications GET
const getAllApplications = async(req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//eine Application ausgeben /applications/:id GET
const getSingleApplication = async(req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.findById(id);
        res.status(200).json(application);
        return application;
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//eine Application erstellen /applications POST
const createApplication = async(req, res) => {
    try {
        const application = await new Application(req.body);
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


//eine Application löschen /applications/:id DELETE
const deleteApplication = async(req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Application.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).send(`Application with ID: ${id} deleted`);
        }
        throw new Error("Application not found");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports= {
    getAllApplications,
    getSingleApplication,
    createApplication,
    deleteApplication
};