const jwt = require('jsonwebtoken');

// Middleware untuk verifikasi JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: 'Token tidak tersedia, akses ditolak!' });
    }

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token tidak valid' });
        }
        req.user = user;
        next();
    });
};

// Middleware untuk memastikan user adalah admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses hanya untuk admin' });
    }
    next();
};

module.exports = { authenticateJWT, isAdmin };
