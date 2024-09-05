const User = require('../model/userModel');

// Add a new user
const addUser = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
};

// Get a user by ID
const getUserByUserId = async (userId) => {
    return await User.findOne({ user_id: userId });
};

// Get all users
const getAllUsers = async () => {
    return await User.find();
};

// Delete a user by ID
const deleteUserById = async (id) => {
    return await User.findOneAndDelete({ id });
};

module.exports = {
    addUser,
    getUserByUserId,
    getAllUsers,
    deleteUserById
};
