const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.role !== 'admin') {
            return res.status(401).json({ message: 'Email atau password salah, atau Anda bukan admin' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            'your_secret_key',
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login berhasil', token });
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan saat login', error: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Menghapus password dari hasil query
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data user', error: err.message });
    }
};

module.exports = { loginAdmin, getAllUsers };
