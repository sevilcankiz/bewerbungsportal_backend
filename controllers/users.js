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
                certName,
                certURL
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
            certificates: [{certName, certURL}],
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



module.exports={
                getAllUsers, 
                getSingleUser,
                createUser,
                updateUser,
                deleteUser,
            };