const userUsecase = require('../domain/usecase/userUsecase');
const User = require('../domain/model/userModel');


const getAllUsers = async (req, res) => {
    try {
        const users = await userUsecase.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error getting users', error });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await userUsecase.getUser(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting user', error });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = await userUsecase.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userUsecase.updateUser(req.params.id, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await userUsecase.deleteUser(req.params.id);
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

const searchUser = async (req, res) => {
    try {
        const users = await User.find({ username: { $regex: req.query.name, $options: 'i' } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error searching users', error });
    }
};


module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    searchUser
};
