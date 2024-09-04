const User = require('../user');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            req.session.user = user;
            res.json({ message: 'Login berhasil', user });
        } else {
            res.status(401).json({ message: 'Email atau password salah' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan saat login', error: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengambil data user', error: err.message });
    }
};

const getUserData = (req, res) => {
    if (req.session.user) {
        const userData = {
            id: req.session.user._id,
            name: req.session.user.name,
            email: req.session.user.email,
            linkImgProfile: req.session.user.linkImgProfile
        };
        res.json(userData);
    } else {
        res.status(401).json({ message: 'Anda belum login' });
    }
};

const updateUser = async (req, res) => {
    const { name, password, linkImgProfile } = req.body;

    if (!req.session.user) {
        return res.status(401).json({ message: 'Silakan login terlebih dahulu' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.session.user._id,
            { name, password, linkImgProfile },
            { new: true, runValidators: true }
        );
        req.session.user = updatedUser;
        res.json({ message: 'Update berhasil', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengupdate user', error: err.message });
    }
};

const removeUser = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Silakan login terlebih dahulu' });
    }

    try {
        await User.findByIdAndDelete(req.session.user._id);
        req.session.destroy();
        res.json({ message: 'Akun berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: 'Gagal menghapus akun', error: err.message });
    }
};

const addUser = async (req, res) => {
    const { name, email, password, linkImgProfile } = req.body;

    try {
        const newUser = new User({ name, email, password, linkImgProfile });
        await newUser.save();
        res.json({ message: 'User berhasil ditambahkan', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Gagal menambahkan user', error: err.message });
    }
};

module.exports = {
    loginUser,
    getAllUsers,
    getUserData,
    updateUser,
    removeUser,
    addUser
};
