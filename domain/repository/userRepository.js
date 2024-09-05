const User = require('../model/userModel');

// Add a new user
const addUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

// Get a user by user_id
const getUserByUserId = async (userId) => {
    return await User.findOne({ user_id: userId });
};

// Get all users
const getAllUsers = async () => {
    return await User.find();
};

// Delete a user by user_id
const deleteUserById = async (userId) => {
    return await User.deleteOne({ user_id: userId });
};

module.exports = {
    addUser,
    getUserByUserId,
    getAllUsers,
    deleteUserById
};
