// const bcrypt = require('bcrypt');
// const User = require('../model/userModel');
// const userRepository = require('../repository/userRepository');
// const { v4: uuidv4 } = require('uuid');

// const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

// const generateUserId = () => {
//     return uuidv4();
// };

// // Function to create a new user
// const createUser = async ({ username, email, password, role }) => {
//     try {
//         const user_id = generateUserId();
//         // Hash the password using bcrypt
//         const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//         // Create a new user using the Mongoose model
//         const newUser = new User({
//             user_id,
//             username,
//             email,
//             password: hashedPassword,
//             role,
//         });

//         // Save the new user to the database
//         await newUser.save();

//         return newUser;
//     } catch (error) {
//         throw new Error('Error creating user: ' + error.message);
//     }
// };
// // const getUser = async (id) => {
// //     return await userRepository.getUserById(id);
// // };

// // const getAllUsers = async () => {
// //     return await userRepository.getAllUsers();
// // };

// const getAllUsers = async () => {
//     try {
//         const users = await User.find({});
//         console.log('Retrieved users:', users);
//         return users;
//     } catch (error) {
//         console.error('Error retrieving users:', error);
//         throw error;
//     }
// };

// const getUser = async (userId) => {
//     try {
//         // const user = await User.findById(userId);
//         // console.log('Retrieved user:', user);
//         // return user;
//         return await userRepository.getUserByUserId(userId);
//     } catch (error) {
//         console.error('Error retrieving user:', error);
//         throw error;
//     }
// };


// const updateUser = async (id, { name, password }) => {
//     const user = await userRepository.getUserById(id);
//     if (!user) {
//         return null;
//     }
//     user.name = name;
//     user.password = password;
//     return await user.save();
// };

// const deleteUser = async (id) => {
//     return await userRepository.deleteUserById(id);
// };

// module.exports = {
//     createUser,
//     getUser,
//     getAllUsers,
//     updateUser,
//     deleteUser
// };

const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const userRepository = require('../repository/userRepository');
const { v4: uuidv4 } = require('uuid');

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

const generateUserId = () => {
    return uuidv4();
};

// Function to create a new user
const createUser = async (userData) => {
    userData.user_id = generateUserId();
    userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
    return await userRepository.addUser(userData);
};

// Function to get all users
const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};

// Function to get one user by user_id
const getUser = async (userId) => {
    return await userRepository.getUserByUserId(userId);
};

// Function to update user by user_id
const updateUser = async (userId, userData) => {
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
    }
    userData.updated_at = Date.now();
    return await User.findOneAndUpdate({ user_id: userId }, userData, { new: true });
};

// Function to delete user by user_id
const deleteUser = async (userId) => {
    return await userRepository.deleteUserById(userId);
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};
