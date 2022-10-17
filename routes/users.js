const express = require('express');

const {
    getAllUsers, 
    getSingleUser, 
    createUser, 
    updateUser, 
    deleteUser,
    getAddress,
    createAddress,
    updateAddress
    } = require('../controllers/users');

const usersRouter = express.Router();

// Users
usersRouter.route('/').get(getAllUsers).post(createUser);
usersRouter.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
// Users-Address
usersRouter.route('/:id/address').get(getAddress).post(createAddress).put(updateAddress);
// Users-Resumes
// usersRouter.route('/:id/resumes').get(getAllResumes).post(createResume);
// usersRouter.route('/:id/resumes/:id').get(getSingleResumes).put(updateResume).delete(deleteResume);
// // Users-Certificates
// usersRouter.route('/:id/certificates').get(getAllCertificates).post(createCertificate);
// usersRouter.route('/:id/certificates/:id').get(getSingleCertificate).put(updateCertificate).delete(deleteCertificate);


module.exports=usersRouter;
