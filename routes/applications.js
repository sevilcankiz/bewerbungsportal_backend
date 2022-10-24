const express = require('express');

//Controllers
const { 
    getAllApplications,
    getSingleApplication,
    createApplication, 
    deleteApplication
} = require('../controllers/applications');

const applicationsRouter = express.Router();
applicationsRouter.route("/").get(getAllApplications).post(createApplication);
applicationsRouter.route("/:id").get(getSingleApplication).delete(deleteApplication);

module.exports=applicationsRouter;