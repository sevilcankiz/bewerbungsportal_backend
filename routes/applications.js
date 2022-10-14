const express = require('express');

//Controllers
const getAllApplications = require('../controllers/applications');

const applicationsRouter = express.Router();
applicationsRouter.route("/").get(getAllApplications);




module.exports=applicationsRouter;