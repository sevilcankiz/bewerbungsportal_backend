const User = require('../models/User');
const Address = require('../models/Address');



const getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

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

const createUser = async(req, res) => {
    try {
        const { firstName, 
                lastName, 
                address:{
                    postCode,
                    street,
                    city,
                    email
                } 
        } = req.body;
        const newUser = await User.create(
            { firstName, 
                lastName, 
                address:{
                    postCode,
                    street,
                    city,
                    email
                } 
            }
        );
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateUser = async(req, res) => {
    try { 
        const { id } = req.params;
        const { firstName, 
            lastName, 
            address:{
                postCode,
                street,
                city,
                email
            } 
    } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        id,
        {   firstName, 
            lastName, 
            address:{
                postCode,
                street,
                city,
                email
            } 
        }
    );
    res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteUser = async(req, res) => {
    try { 
        const { id } = req.params; 
        const user = await User.findByIdAndDelete(id);
        res.status(200).send(`${user.firstName} ${user.lastName} wurde gleöscht.`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//################## User-Address ###################################
const getAddress = async(req, res)=>{
    try {
        const {id, type} = req.params;
        if (type !== 'address') return res.send('Keine addresse angegeben'); 

        const user = await User.findById(id);
        const address = user[type];
        res.status(200).json(address);
    } catch (error) {
        res.status(500).send(error.message); 
    }
};

const updateAddress = async(req, res)=>{
    try {
        const {id, type} = req.params;
        // const userId = ObjektID(id.toString());
        // console.log(userId);
        const { 
            postCode,
            street,
            city,
            email} = req.body;
        if (type !== 'address') return res.send('Keine addresse angegeben'); 
        const newAddress = { 
            postCode,
            street,
            city,
            email};    
        const updatedUser = await User.findByIdAndUpdate(id, {   
            address: newAddress
        });
        
        res.status(201).json(newAddress);
        await addresses.deleteOne(newAddress);
    } catch (error) {
        res.status(500).send(error.message); 
    }
};

// const updateAddress = async(req, res)=>{
//     try {
        
//     } catch (error) {
//         res.status(500).send(error.message); 
//     }
// };

module.exports={
                getAllUsers, 
                getSingleUser,
                createUser,
                updateUser,
                deleteUser,
                getAddress,
                updateAddress
                };