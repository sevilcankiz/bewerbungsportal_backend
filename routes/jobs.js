const express = require('express');
const router = express.Router();

//Controllers
const {
    getAllJobs,
    getSingleJob,
} = require('../controllers/jobs');

router.route("/").get(getAllJobs);
router.route("/:id").get(getSingleJob);
