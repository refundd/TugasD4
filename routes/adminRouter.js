const express = require('express');
const { loginAdmin, getAllUsers } = require('../controller/adminController');
const { authenticateJWT, isAdmin } = require('../middlewares/auth');

const router = express.Router();

// Route untuk login admin
router.post('/login', loginAdmin);

// Route untuk cek semua data user (hanya bisa diakses admin)
router.get('/users', authenticateJWT, isAdmin, getAllUsers);

module.exports = router;
