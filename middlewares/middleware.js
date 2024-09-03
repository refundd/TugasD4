const { body, validationResult } = require('express-validator');

const validateUser = [
    body('id').isInt({ gt: 0 }).withMessage('ID harus bilangan bulat positif'),
    body('name').isLength({ min: 3, max: 15 }).withMessage('Nama harus antara 3 hingga 15 karakter'),
    body('email').isEmail().withMessage('Format email tidak valid'),
    body('password').isLength({ min: 7, max: 15 }).withMessage('Password harus antara 7 hingga 15 karakter'),
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
