const express = require('express');
const userController = require('../controller/userController');
const { validateUser } = require('../middlewares/middleware');
const router = express.Router();

router.post('/login', userController.loginUser);
router.get('/all', userController.getAllUsers);
router.get('/me', userController.getUserData);
router.put('/me', validateUser, userController.updateUser);
router.delete('/me', userController.removeUser);
router.post('/add', validateUser, userController.addUser);

module.exports = router;
