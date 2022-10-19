const express = require('express');

const {
    getAllUsers, 
    getSingleUser, 
    createUser, 
    updateUser, 
    deleteUser,
    getAllUserDocumentsofType,
    getSingleUserDocumentofType,
    createDocumentofType,
    updateDocumentofType,
    deleteDocumentofType
    } = require('../controllers/users');

const usersRouter = express.Router();

// Users
usersRouter.route('/').get(getAllUsers).post(createUser);
usersRouter.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// User-Documents of Type: ( Certificates / Resumes)
usersRouter.route('/:id/:type').get(getAllUserDocumentsofType).post(createDocumentofType);
usersRouter.route('/:id/:type/:docId').get(getSingleUserDocumentofType).put(updateDocumentofType).delete(deleteDocumentofType);

module.exports=usersRouter;
