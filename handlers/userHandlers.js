// const userUsecase = require('../domain/usecase/userUsecase');

// // Handler for getting all users
// const getAllUsers = async (req, res) => {
//     try {
//         const users = await userUsecase.getAllUsers();
//         res.status(200).json({
//             message: "Successfully retrieved all users",
//             data: users
//         });
//     } catch (error) {
//         console.error('Error retrieving users:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Handler for getting a single user
// const getUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await userUsecase.getUser(id);
//         console.log('Users to send:', users); // Log the data

//         if (!user) {
//             return res.status(404).send({ message: 'User not found' });
//         }

//         res.status(200).json({
//             message: "Successfully retrieved user",
//             data: user
//         });
//     } catch (error) {
//         console.error('Error retrieving user:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// // Handler for creating a new user
// const createUser = async (req, res) => {
//     try {
//         const { username, email, password, role } = req.body;

//         // Check if required fields are present
//         if (!username || !email || !password) {
//             return res.status(400).send({ message: 'Username, email, and password are required' });
//         }

//         // Call the use case function to create a user
//         const newUser = await userUsecase.createUser({ username, email, password, role });

//         res.status(201).json({
//             message: "Successfully created user",
//             data: newUser
//         });
//     } catch (error) {
//         res.status(500).send({ message: 'Internal Server Error', error: error.message });
//     }
// };

// // Handler for updating a user
// const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, password } = req.body;

//         // if (!name || !password) {
//         //     return res.status(400).send({ message: 'Name and password are required' });
//         // }

//         const updatedUser = userUsecase.updateUser(id, { name, password });

//         if (!updatedUser) {
//             return res.status(404).send({ message: 'User not found' });
//         }

//         res.status(200).json({
//             message: "Successfully updated user",
//             data: updatedUser
//         });
//     } catch (error) {
//         res.status(500).send({ message: 'Internal Server Error' });
//     }
// };

// // Handler for deleting a user
// const deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         userUsecase.deleteUser(id);

//         res.status(204).send({ message: 'Successfully deleted user' }).end();
//     } catch (error) {
//         res.status(500).send({ message: 'Internal Server Error' });
//     }
// };

// // Handler for searching users by name
// const searchUser = async (req, res) => {
//     try {
//         const { name } = req.query;
//         if (!name) {
//             return res.status(400).send({ message: 'Name is required' });
//         }
//         const users = userUsecase.getAllUsers();
//         const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(name.toLowerCase()));

//         if (filteredUsers.length === 0) {
//             return res.status(404).send({ message: 'No users found matching the provided name' });
//         }

//         res.status(200).json({
//             message: "Successfully retrieved user(s)",
//             data: filteredUsers
//         });
//     } catch (error) {
//         res.status(500).send({ message: 'Internal Server Error' });
//     }
// };

// module.exports = {
//     getAllUsers,
//     getUser,
//     createUser,
//     updateUser,
//     deleteUser,
//     searchUser
// };

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
