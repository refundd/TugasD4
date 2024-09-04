const { check, validationResult } = require('express-validator');
const User = require('../user');

const validateUser = [
    check('name').isLength({ min: 3, max: 20 }).withMessage('Nama harus antara 3 dan 20 karakter'),
    check('email').isEmail().withMessage('Email tidak valid')
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email sudah digunakan');
            }
        }),
    check('password').isLength({ min: 7, max: 20 }).withMessage('Password harus antara 7 dan 20 karakter'),
    check('linkImgProfile').optional().isURL().withMessage('URL gambar profil tidak valid'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateUser
};
