const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const userRepository = require('../repository/userRepository');
const { v4: uuidv4 } = require('uuid');

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

const generateUserId = () => {
    return uuidv4();
};

// Function to create a new user
const createUser = async ({ username, email, password, role }) => {
    try {
        const user_id = generateUserId();
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create a new user using the Mongoose model
        const newUser = new User({
            user_id,
            username,
            email,
            password: hashedPassword,
            role,
        });

        // Save the new user to the database
        await newUser.save();

        return newUser;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};
// const getUser = async (id) => {
//     return await userRepository.getUserById(id);
// };

// const getAllUsers = async () => {
//     return await userRepository.getAllUsers();
// };

const getAllUsers = async () => {
    try {
        const users = await User.find({});
        console.log('Retrieved users:', users);
        return users;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw error;
    }
};

const getUser = async (userId) => {
    try {
        // const user = await User.findById(userId);
        // console.log('Retrieved user:', user);
        // return user;
        return await userRepository.getUserByUserId(userId);
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    }
};


const updateUser = async (id, { name, password }) => {
    const user = await userRepository.getUserById(id);
    if (!user) {
        return null;
    }
    user.name = name;
    user.password = password;
    return await user.save();
};

const deleteUser = async (id) => {
    return await userRepository.deleteUserById(id);
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};
