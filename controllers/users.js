const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    console.log("jfjfjf");
    try { 
        const { id } = req.params; 
        const user = await User.findById(id);
        res.status(200).json(user);
        return user;
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// einen eingeloggten User ausgeben /users/me GET
const getSingleUserByToken = async(req, res) => {
    try { 
        const id = req.userId; 
        console.log(id);
        const user = await User.findById(id);

        res.status(200).json(user);
        return user;
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// einen eingeloggten User ausgeben /users/me GET
const getSingleUserByEmail = async(req, res) => {
    try { 
        const {address: {email}, password } = req.body
        //  console.log("email", email);
          
          const found = await User.findOne( { "address.email": email } ).select('+password');

          console.log("found", found);
          if (!found) res.status(404).send("User not found");
          const match = await bcrypt.compare(password, found.password);
          if (!match) res.status(400).send("Password incorrect");
         
          console.log("found._id", found._id);
            const token = jwt.sign({ _id: found._id }, process.env.JWT_SECRET);
            res.status(201).json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// einen User erstellen /users POST
const createUser = async(req, res) => {
    console.log("Req Body", req.body);
    try {
        const { 
                firstName, 
                lastName,
                password,
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
        const hash = await bcrypt.hash(password, 5);
        const { _id } = await User.create(
            { 
                firstName, 
                lastName, 
                password: hash,
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
        console.log("_id", _id);
        const token = jwt.sign({ _id }, process.env.JWT_SECRET);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// einen User komplett updaten /users/:id PUT
const updateUser = async(req, res) => {   
    console.log("Req Body", req.body);     
    console.log("req.params", req.params);            
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
                phone: phone[0]
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
        
        // Check for File
        if (!req.file) {
            res.status(400).send(`No file uploaded. `);
        }
        console.log("Type", type);
        console.log(req.file);

        if (type === 'resumes') {

            // Extract information
            const { originalname, filename } = req.file;
            console.log("filename", filename);
            const resURL = `public/test/${filename}`;
            const resName = originalname;

            // const { resName, resURL } = req.body;
            const user = await User.findById(id);
            user.resumes.push({ resName, resURL });
            await user.save();
            // res.status(200).json(user.resumes);            
        } else {

            // Extract information
            const { originalname, filename } = req.file;
            const certURL = `public/test/${filename}`;
            const certName = originalname;

            // const { certName, certURL } = req.body;
            const user = await User.findById(id);
            user.certificates.push({ certName, certURL });
            await user.save();
            // res.status(200).json(user.certificates);           
        }

        res.writeHead(302, {
           'Location': `${process.env.NODE_PROJECT_API}/userdata`
        });
        res.end();

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
    getSingleUserByToken,
    getSingleUserByEmail, 
    createUser,
    updateUser,
    deleteUser,
    getAllUserDocumentsofType,
    getSingleUserDocumentofType,
    createDocumentofType,
    updateDocumentofType,
    deleteDocumentofType
};