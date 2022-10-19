const User = require('../models/User');


// Alle User ausgeben /users GET
const getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// einen User ausgeben /users/:id GET
const getSingleUser = async(req, res) => {
    try { 
        const { id } = req.params; 
        const user = await User.findById(id);
        res.status(200).json(user);
        return user;
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// einen User erstellen /users POST
const createUser = async(req, res) => {
    try {
        const { 
                firstName, 
                lastName, 
                address:{
                    postCode,
                    street,
                    city,
                    email,
                    phone
                },
                certificates: [{
                    certName,
                    certURL
                }],
                resumes: [{ 
                    resName,
                    resURL
                }] 
        } = req.body;
        const newUser = await User.create(
            { 
                firstName, 
                lastName, 
                address:{
                    postCode,
                    street,
                    city,
                    email,
                    phone: phone[0]
                },
                certificates: [{certName, certURL}],
                resumes: [{resName, resURL}]
            }
        );
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// einen User komplett updaten /users/:id PUT
const updateUser = async(req, res) => {               
    try { 
        const { id } = req.params;
        const { 
            firstName, 
            lastName, 
            address:{
                postCode,
                street,
                city,
                email,
                phone
            },
            certificates: [{
                cerName,
                cerURL
            }],
            resumes: [{ 
                resName,
                resURL
            }] 
    } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        id,
        { 
            firstName, 
            lastName, 
            address:{
                postCode,
                street,
                city,
                email,
                phone: [phone]
            },
            certificates: [{cerName, cerURL}],
            resumes: [{resName, resURL}]
        }
    );
    const refreshedUser = await User.findById(id);
    res.status(200).json(refreshedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//einen User löschen /users/:id DELETE
const deleteUser = async(req, res) => {
    try { 
        const { id } = req.params; 
        const user = await User.findByIdAndDelete(id);
        res.status(200).send(`${user.firstName} ${user.lastName} wurde gelöscht.`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// ###### CRUD-Methoden for User-Documents of Type: ( cerificates / Resumes) ######

// GET /users/:id/:type/  (alle Dokumente eines Typs) OKAY!!  
const getAllUserDocumentsofType = async(req, res) => {
    try {
        const { id, type } = req.params;
        type !== 'resumes' && type !== 'certificates' ? res.status(404).send('Not Found') : null;
        const user = await User.findById(id);
        const documents = user[type];
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// POST /users/:id/:type/ (einen neuen Dokumenttyp hinzufügen) OKAY!!
const createDocumentofType = async(req, res) => {
    try {
        const { id, type } = req.params;
        type !== 'resumes' && type !== 'certificates' ? res.status(404).send('Not Found') : null;
        if (type === 'resumes') {
            const { resName, resURL } = req.body;
            const user = await User.findById(id);
            user.resumes.push({ resName, resURL });
            await user.save();
            res.status(200).json(user.resumes);            
        } else {
            const { certName, certURL } = req.body;
            const user = await User.findById(id);
            user.certificates.push({ certName, certURL });
            await user.save();
            res.status(200).json(user.certificates);           
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// GET /users/:id/:type/:docId (ein Dokument eines Typs) OKAY!!
const getSingleUserDocumentofType = async(req, res) => {
    try {
        const { id, type, docId } = req.params;
        type !== 'resumes' && type !== 'certificates' ? res.status(404).send('Not Found') : null;
        const user = await User.findById(id);
        const document = user[type].id(docId);
        res.status(200).json(document);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// PUT /users/:id/:type/:docId (ein Dokument eines Typs updaten) OKAY!!
const updateDocumentofType = async(req, res) => {
    try {
        const { id, type, docId } = req.params;
        console.log(id, type, docId);
        type !== 'resumes' && type !== 'certificates' ? res.status(404).send('Not Found') : null;
        if (type === 'resumes') {
            const { resName, resURL } = req.body;
            const user = await User.findById(id);
            const document = user[type].id(docId);
            document.resName = resName;
            document.resURL = resURL;
            await user.save();
            res.status(200).json(document);            
        } else {
            const { certName, certURL } = req.body;
            const user = await User.findById(id);
            const document = user[type].id(docId);
            document.certName = certName;
            document.certURL = certURL;
            await user.save();
            res.status(200).json(document);           
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// DELETE /users/:id/:type/:docId (ein Dokument eines Typs) OKAY!!
const deleteDocumentofType = async(req, res) => {
    try {
        const { id, type, docId } = req.params;
        type !== 'resumes' && type !== 'certificates' ? res.status(404).send('Not Found') : null;
        const user = await User.findById(id);
        const document = user[type].id(docId);
        document.remove();
        await user.save();
        res.status(200).json(user[type]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports={
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
};