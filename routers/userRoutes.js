const express = require('express');
const router = express.Router();
const userHandlers = require('../handlers/userHandlers');

router.get('/', userHandlers.getAllUsers);
router.get('/:id', userHandlers.getUser);
router.post('/', userHandlers.createUser);
router.put('/:id', userHandlers.updateUser);
router.delete('/:id', userHandlers.deleteUser);
router.get('/name/search', userHandlers.searchUser);

module.exports = router;
